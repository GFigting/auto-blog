import { Status } from '../src/models';
import { planGenerator } from '../src/modules/PlanGenerator';
import { statusManager } from '../src/modules/StatusManager';
import { db } from '../src/utils/database';

describe('StatusManager', () => {
  beforeEach(() => {
    // 清空数据库
    db.clear();
  });

  describe('updateStepStatus', () => {
    it('应该更新步骤状态并计算进度', () => {
      // 创建一个测试计划
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);

      // 获取第一个步骤
      const firstStep = savedPlan.steps[0];

      // 更新步骤状态为进行中
      const updatedPlan1 = statusManager.updateStepStatus(
        savedPlan.id,
        firstStep.id,
        Status.IN_PROGRESS
      );

      expect(updatedPlan1).toBeDefined();
      const updatedStep1 = updatedPlan1?.steps.find(step => step.id === firstStep.id);
      expect(updatedStep1?.status).toBe(Status.IN_PROGRESS);
      expect(updatedPlan1?.progress).toBe(0); // 只有进行中，进度不变

      // 更新步骤状态为已完成
      const updatedPlan2 = statusManager.updateStepStatus(
        savedPlan.id,
        firstStep.id,
        Status.COMPLETED,
        {
          passed: true,
          details: '测试通过',
          timestamp: new Date()
        }
      );

      expect(updatedPlan2).toBeDefined();
      const updatedStep2 = updatedPlan2?.steps.find(step => step.id === firstStep.id);
      expect(updatedStep2?.status).toBe(Status.COMPLETED);
      expect(updatedPlan2?.progress).toBe(14); // 7个步骤，完成1个，约14%
    });

    it('应该在依赖步骤完成后更新后续步骤状态', () => {
      // 创建一个测试计划
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);

      // 获取需求分析和设计方案步骤
      const requirementStep = savedPlan.steps.find(step => step.name === '需求分析');
      const designStep = savedPlan.steps.find(step => step.name === '设计方案');

      expect(requirementStep).toBeDefined();
      expect(designStep).toBeDefined();
      expect(designStep?.status).toBe(Status.PENDING); // 初始状态为待执行

      // 完成需求分析步骤
      const updatedPlan = statusManager.updateStepStatus(
        savedPlan.id,
        requirementStep!.id,
        Status.COMPLETED,
        {
          passed: true,
          details: '测试通过',
          timestamp: new Date()
        }
      );

      expect(updatedPlan).toBeDefined();
      const updatedDesignStep = updatedPlan?.steps.find(step => step.id === designStep!.id);
      expect(updatedDesignStep?.status).toBe(Status.NOT_STARTED); // 依赖完成后变为未开始
    });

    it('应该拒绝无效的状态转换', () => {
      // 创建一个测试计划
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);

      // 获取第一个步骤
      const firstStep = savedPlan.steps[0];

      // 尝试从已完成转换为进行中（应该失败）
      // 首先将步骤标记为已完成
      statusManager.updateStepStatus(
        savedPlan.id,
        firstStep.id,
        Status.COMPLETED,
        {
          passed: true,
          details: '测试通过',
          timestamp: new Date()
        }
      );
      
      // 然后尝试从已完成转换为进行中（应该失败）
      expect(() => {
        statusManager.updateStepStatus(
          savedPlan.id,
          firstStep.id,
          Status.IN_PROGRESS
        );
      }).toThrow();
    });
  });

  describe('calculateProgress', () => {
    it('应该正确计算计划进度', () => {
      // 创建一个测试计划
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      
      // 所有步骤都未完成
      const progress1 = statusManager.calculateProgress(plan.steps);
      expect(progress1).toBe(0);

      // 完成一半步骤
      const halfCompletedSteps = [...plan.steps];
      for (let i = 0; i < halfCompletedSteps.length / 2; i++) {
        halfCompletedSteps[i].status = Status.COMPLETED;
      }
      
      const progress2 = statusManager.calculateProgress(halfCompletedSteps);
      expect(progress2).toBe(57); // 7个步骤，完成4个，约57%

      // 完成所有步骤
      const allCompletedSteps = [...plan.steps];
      allCompletedSteps.forEach(step => {
        step.status = Status.COMPLETED;
      });
      
      const progress3 = statusManager.calculateProgress(allCompletedSteps);
      expect(progress3).toBe(100);
    });
  });
});