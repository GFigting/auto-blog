import { Plan, PlanStep, Status } from '../models';
import { db } from '../utils/database';

class StatusManager {
  /**
   * 更新步骤状态
   */
  updateStepStatus(
    planId: string,
    stepId: string,
    newStatus: Status,
    testResults?: {
      passed: boolean;
      details: string;
      timestamp: Date;
    }
  ): Plan | undefined {
    const plan = db.getPlanById(planId);
    if (!plan) return undefined;

    const stepIndex = plan.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) return undefined;

    // 如果要标记为已完成，先检查前置条件
    if (newStatus === Status.COMPLETED) {
      if (!this.checkCompletionPreconditions(plan, stepId, testResults)) {
        throw new Error('步骤完成的前置条件未满足');
      }
    }

    // 检查状态转换的有效性
    if (!this.isValidStatusTransition(plan.steps[stepIndex].status, newStatus)) {
      throw new Error(`无效的状态转换: ${plan.steps[stepIndex].status} -> ${newStatus}`);
    }

    // 更新步骤状态
    const updatedStep = { ...plan.steps[stepIndex] };
    updatedStep.status = newStatus;
    updatedStep.updatedAt = new Date();

    if (newStatus === Status.COMPLETED && testResults) {
      updatedStep.completedAt = new Date();
      updatedStep.testResults = testResults;
    }

    // 更新计划
    const updatedPlan = { ...plan };
    updatedPlan.steps[stepIndex] = updatedStep;
    updatedPlan.updatedAt = new Date();
    updatedPlan.progress = this.calculateProgress(updatedPlan.steps);

    // 更新依赖步骤的状态
    this.updateDependentStepsStatus(updatedPlan, stepId);

    // 保存更新后的计划
    return db.updatePlan(updatedPlan);
  }

  /**
   * 检查状态转换的有效性
   */
  private isValidStatusTransition(currentStatus: Status, newStatus: Status): boolean {
    const validTransitions: Record<Status, Status[]> = {
      [Status.NOT_STARTED]: [Status.IN_PROGRESS, Status.PENDING, Status.COMPLETED],
      [Status.PENDING]: [Status.IN_PROGRESS],
      [Status.IN_PROGRESS]: [Status.COMPLETED, Status.FAILED],
      [Status.COMPLETED]: [],
      [Status.FAILED]: [Status.IN_PROGRESS]
    };

    return validTransitions[currentStatus].includes(newStatus);
  }

  /**
   * 检查步骤完成的前置条件
   */
  private checkCompletionPreconditions(
    plan: Plan,
    stepId: string,
    testResults?: {
      passed: boolean;
      details: string;
      timestamp: Date;
    }
  ): boolean {
    const step = plan.steps.find(s => s.id === stepId);
    if (!step) return false;

    // 检查所有依赖步骤是否已完成
    for (const depId of step.dependencies) {
      const depStep = plan.steps.find(s => s.id === depId);
      if (!depStep || depStep.status !== Status.COMPLETED) {
        return false;
      }
    }

    // 检查测试结果（如果需要）
    if (testResults && !testResults.passed) {
      return false;
    }

    return true;
  }

  /**
   * 更新依赖步骤的状态
   */
  private updateDependentStepsStatus(plan: Plan, completedStepId: string): void {
    // 找出所有依赖于已完成步骤的步骤
    const dependentSteps = plan.steps.filter(step => 
      step.dependencies.includes(completedStepId)
    );

    dependentSteps.forEach(step => {
      // 检查该步骤的所有依赖是否都已完成
      const allDependenciesCompleted = step.dependencies.every(depId => {
        const depStep = plan.steps.find(s => s.id === depId);
        return depStep && depStep.status === Status.COMPLETED;
      });

      // 如果所有依赖都已完成，将状态从待执行改为未开始
      if (allDependenciesCompleted && step.status === Status.PENDING) {
        step.status = Status.NOT_STARTED;
        step.updatedAt = new Date();
      }
    });
  }

  /**
   * 计算计划的整体进度
   */
  calculateProgress(steps: PlanStep[]): number {
    if (steps.length === 0) return 0;

    const completedSteps = steps.filter(step => step.status === Status.COMPLETED).length;
    return Math.round((completedSteps / steps.length) * 100);
  }

  /**
   * 初始化计划中所有步骤的状态
   */
  initializeStepsStatus(plan: Plan): Plan {
    const updatedPlan = { ...plan };
    const updatedSteps = [...plan.steps];

    // 首先将所有步骤标记为待执行
    updatedSteps.forEach(step => {
      step.status = Status.PENDING;
      step.updatedAt = new Date();
    });

    // 然后将没有依赖的步骤标记为未开始
    updatedSteps.forEach(step => {
      if (step.dependencies.length === 0) {
        step.status = Status.NOT_STARTED;
        step.updatedAt = new Date();
      }
    });

    updatedPlan.steps = updatedSteps;
    updatedPlan.progress = this.calculateProgress(updatedSteps);
    updatedPlan.updatedAt = new Date();

    return updatedPlan;
  }

  /**
   * 获取步骤的依赖关系图
   */
  getDependencyGraph(plan: Plan): Record<string, string[]> {
    const graph: Record<string, string[]> = {};
    
    plan.steps.forEach(step => {
      graph[step.id] = step.dependencies;
    });
    
    return graph;
  }
}

export const statusManager = new StatusManager();