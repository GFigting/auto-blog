import { planGenerator } from '../src/modules/PlanGenerator';

describe('PlanGenerator', () => {
  describe('generateDefaultPlan', () => {
    it('应该生成包含默认步骤的计划', () => {
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');

      expect(plan).toBeDefined();
      expect(plan.name).toBe('测试任务');
      expect(plan.description).toBe('这是一个测试任务');
      expect(plan.steps).toHaveLength(7);
      expect(plan.progress).toBe(0);
      
      // 验证步骤名称
      const stepNames = plan.steps.map(step => step.name);
      expect(stepNames).toContain('需求分析');
      expect(stepNames).toContain('设计方案');
      expect(stepNames).toContain('代码实现');
      expect(stepNames).toContain('单元测试');
      expect(stepNames).toContain('集成测试');
      expect(stepNames).toContain('验收测试');
      expect(stepNames).toContain('部署上线');
      
      // 验证依赖关系
      const designStep = plan.steps.find(step => step.name === '设计方案');
      expect(designStep?.dependencies).toHaveLength(1);
      
      const codeStep = plan.steps.find(step => step.name === '代码实现');
      expect(codeStep?.dependencies).toHaveLength(1);
    });
  });

  describe('generateCustomPlan', () => {
    it('应该根据自定义步骤生成计划', () => {
      const customSteps = [
        {
          name: '步骤1',
          description: '第一步',
          expectedCompletionTime: new Date('2023-12-01')
        },
        {
          name: '步骤2',
          description: '第二步',
          expectedCompletionTime: new Date('2023-12-02'),
          dependencies: ['步骤1']
        }
      ];

      const plan = planGenerator.generateCustomPlan('自定义任务', '这是一个自定义任务', customSteps);

      expect(plan).toBeDefined();
      expect(plan.name).toBe('自定义任务');
      expect(plan.description).toBe('这是一个自定义任务');
      expect(plan.steps).toHaveLength(2);
      
      // 验证步骤
      const step1 = plan.steps.find(step => step.name === '步骤1');
      const step2 = plan.steps.find(step => step.name === '步骤2');
      
      expect(step1).toBeDefined();
      expect(step2).toBeDefined();
      
      // 验证依赖关系
      expect(step2?.dependencies).toContain(step1?.id);
    });
  });
});