import { Plan, PlanStep, Issue } from '../models';

class Database {
  private plans: Map<string, Plan> = new Map();

  /**
   * 获取所有计划
   */
  getAllPlans(): Plan[] {
    return Array.from(this.plans.values());
  }

  /**
   * 根据ID获取计划
   */
  getPlanById(id: string): Plan | undefined {
    return this.plans.get(id);
  }

  /**
   * 创建新计划
   */
  createPlan(plan: Plan): Plan {
    this.plans.set(plan.id, plan);
    return plan;
  }

  /**
   * 更新计划
   */
  updatePlan(plan: Plan): Plan | undefined {
    if (this.plans.has(plan.id)) {
      this.plans.set(plan.id, plan);
      return plan;
    }
    return undefined;
  }

  /**
   * 删除计划
   */
  deletePlan(id: string): boolean {
    return this.plans.delete(id);
  }

  /**
   * 获取计划中的所有步骤
   */
  getStepsByPlanId(planId: string): PlanStep[] {
    const plan = this.plans.get(planId);
    return plan ? plan.steps : [];
  }

  /**
   * 获取计划中的所有问题
   */
  getIssuesByPlanId(planId: string): Issue[] {
    const plan = this.plans.get(planId);
    return plan ? plan.issues : [];
  }

  /**
   * 获取特定步骤的问题
   */
  getIssuesByStepId(planId: string, stepId: string): Issue[] {
    const plan = this.plans.get(planId);
    return plan ? plan.issues.filter(issue => issue.stepId === stepId) : [];
  }

  /**
   * 清空所有数据（用于测试）
   */
  clear(): void {
    this.plans.clear();
  }
}

// 导出单例实例
export const db = new Database();