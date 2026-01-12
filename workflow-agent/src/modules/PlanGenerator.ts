import { v4 as uuidv4 } from 'uuid';
import { Plan, PlanStep, Status } from '../models';
import { addDays } from 'date-fns';

interface PlanTemplate {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    description: string;
    expectedDays: number;
    dependencies?: string[];
  }>;
}

class PlanGenerator {
  /**
   * 根据任务需求生成默认计划
   */
  generateDefaultPlan(taskName: string, taskDescription: string): Plan {
    // 定义默认的计划模板
    const template: PlanTemplate = {
      name: taskName,
      description: taskDescription,
      steps: [
        {
          name: '需求分析',
          description: '分析任务需求，确定实现范围和目标',
          expectedDays: 1
        },
        {
          name: '设计方案',
          description: '设计技术方案和架构',
          expectedDays: 1,
          dependencies: ['需求分析']
        },
        {
          name: '代码实现',
          description: '根据设计方案实现功能代码',
          expectedDays: 3,
          dependencies: ['设计方案']
        },
        {
          name: '单元测试',
          description: '编写并执行单元测试',
          expectedDays: 1,
          dependencies: ['代码实现']
        },
        {
          name: '集成测试',
          description: '进行系统集成测试',
          expectedDays: 1,
          dependencies: ['单元测试']
        },
        {
          name: '验收测试',
          description: '进行用户验收测试',
          expectedDays: 1,
          dependencies: ['集成测试']
        },
        {
          name: '部署上线',
          description: '部署系统到生产环境',
          expectedDays: 1,
          dependencies: ['验收测试']
        }
      ]
    };

    return this.generatePlanFromTemplate(template);
  }

  /**
   * 根据模板生成计划
   */
  generatePlanFromTemplate(template: PlanTemplate): Plan {
    const today = new Date();
    const stepMap = new Map<string, string>(); // 步骤名称到ID的映射
    const steps: PlanStep[] = [];

    // 第一遍：创建所有步骤，记录名称到ID的映射
    template.steps.forEach((templateStep) => {
      const stepId = uuidv4();
      stepMap.set(templateStep.name, stepId);
    });

    // 第二遍：创建步骤对象，设置依赖关系
    template.steps.forEach((templateStep) => {
      const stepId = stepMap.get(templateStep.name)!;
      
      // 解析依赖关系
      const dependencies = templateStep.dependencies?.map(depName => stepMap.get(depName)!) || [];
      
      // 计算预期完成时间
      const expectedCompletionTime = addDays(today, templateStep.expectedDays);

      const step: PlanStep = {
        id: stepId,
        name: templateStep.name,
        description: templateStep.description,
        expectedCompletionTime,
        dependencies,
        status: Status.NOT_STARTED,
        createdAt: today,
        updatedAt: today
      };

      steps.push(step);
    });

    // 创建计划对象
    const plan: Plan = {
      id: uuidv4(),
      name: template.name,
      description: template.description,
      steps,
      issues: [],
      createdAt: today,
      updatedAt: today,
      progress: 0 // 初始进度为0%
    };

    return plan;
  }

  /**
   * 自定义计划生成（允许用户完全自定义步骤）
   */
  generateCustomPlan(
    name: string,
    description: string,
    steps: Array<{
      name: string;
      description: string;
      expectedCompletionTime: Date;
      dependencies?: string[];
    }>
  ): Plan {
    const today = new Date();
    const stepMap = new Map<string, string>();
    const planSteps: PlanStep[] = [];

    // 第一遍：创建所有步骤，记录名称到ID的映射
    steps.forEach((step) => {
      const stepId = uuidv4();
      stepMap.set(step.name, stepId);
    });

    // 第二遍：创建步骤对象，设置依赖关系
    steps.forEach((step) => {
      const stepId = stepMap.get(step.name)!;
      const dependencies = step.dependencies?.map(depName => stepMap.get(depName)!) || [];

      const planStep: PlanStep = {
        id: stepId,
        name: step.name,
        description: step.description,
        expectedCompletionTime: step.expectedCompletionTime,
        dependencies,
        status: Status.NOT_STARTED,
        createdAt: today,
        updatedAt: today
      };

      planSteps.push(planStep);
    });

    // 创建计划对象
    const plan: Plan = {
      id: uuidv4(),
      name,
      description,
      steps: planSteps,
      issues: [],
      createdAt: today,
      updatedAt: today,
      progress: 0
    };

    return plan;
  }
}

export const planGenerator = new PlanGenerator();