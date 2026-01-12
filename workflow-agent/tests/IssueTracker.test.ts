import { issueTracker } from '../src/modules/IssueTracker';
import { planGenerator } from '../src/modules/PlanGenerator';
import { statusManager } from '../src/modules/StatusManager';
import { db } from '../src/utils/database';
import { IssuePriority, IssueStatus } from '../src/models';

describe('IssueTracker', () => {
  beforeEach(() => {
    // 清空数据库
    db.clear();
  });

  describe('createIssue', () => {
    it('应该创建新问题并关联到步骤', () => {
      // 创建一个测试计划
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);

      // 获取第一个步骤
      const firstStep = savedPlan.steps[0];

      // 创建问题
      const issue = issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '测试问题',
        '这是一个测试问题',
        '影响功能',
        IssuePriority.HIGH,
        '临时解决方案'
      );

      expect(issue).toBeDefined();
      expect(issue?.title).toBe('测试问题');
      expect(issue?.description).toBe('这是一个测试问题');
      expect(issue?.impact).toBe('影响功能');
      expect(issue?.priority).toBe(IssuePriority.HIGH);
      expect(issue?.status).toBe(IssueStatus.PENDING);
      expect(issue?.temporarySolution).toBe('临时解决方案');
      expect(issue?.stepId).toBe(firstStep.id);

      // 验证问题已添加到计划中
      const updatedPlan = db.getPlanById(savedPlan.id);
      expect(updatedPlan?.issues).toHaveLength(1);
      expect(updatedPlan?.issues[0].id).toBe(issue?.id);
    });
  });

  describe('updateIssue', () => {
    it('应该更新问题信息', () => {
      // 创建一个测试计划和问题
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);
      const firstStep = savedPlan.steps[0];

      const issue = issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '测试问题',
        '这是一个测试问题',
        '影响功能',
        IssuePriority.HIGH
      );

      expect(issue).toBeDefined();

      // 更新问题
      const updatedIssue = issueTracker.updateIssue(savedPlan.id, issue!.id, {
        title: '更新后的问题',
        description: '更新后的描述',
        priority: IssuePriority.MEDIUM,
        status: IssueStatus.IN_PROGRESS
      });

      expect(updatedIssue).toBeDefined();
      expect(updatedIssue?.title).toBe('更新后的问题');
      expect(updatedIssue?.description).toBe('更新后的描述');
      expect(updatedIssue?.priority).toBe(IssuePriority.MEDIUM);
      expect(updatedIssue?.status).toBe(IssueStatus.IN_PROGRESS);
    });
  });

  describe('closeIssue', () => {
    it('应该关闭问题（标记为已解决）', () => {
      // 创建一个测试计划和问题
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);
      const firstStep = savedPlan.steps[0];

      const issue = issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '测试问题',
        '这是一个测试问题',
        '影响功能',
        IssuePriority.HIGH
      );

      expect(issue).toBeDefined();
      expect(issue?.status).toBe(IssueStatus.PENDING);

      // 关闭问题
      const closedIssue = issueTracker.closeIssue(savedPlan.id, issue!.id);

      expect(closedIssue).toBeDefined();
      expect(closedIssue?.status).toBe(IssueStatus.RESOLVED);
      expect(closedIssue?.resolvedAt).toBeDefined();
    });
  });

  describe('deleteIssue', () => {
    it('应该删除问题', () => {
      // 创建一个测试计划和问题
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);
      const firstStep = savedPlan.steps[0];

      const issue = issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '测试问题',
        '这是一个测试问题',
        '影响功能',
        IssuePriority.HIGH
      );

      expect(issue).toBeDefined();
      expect(savedPlan.issues).toHaveLength(1);

      // 删除问题
      const deleted = issueTracker.deleteIssue(savedPlan.id, issue!.id);

      expect(deleted).toBe(true);

      // 验证问题已删除
      const updatedPlan = db.getPlanById(savedPlan.id);
      expect(updatedPlan?.issues).toHaveLength(0);
    });
  });

  describe('getIssueStatistics', () => {
    it('应该返回问题统计信息', () => {
      // 创建一个测试计划和多个问题
      const plan = planGenerator.generateDefaultPlan('测试任务', '这是一个测试任务');
      const initializedPlan = statusManager.initializeStepsStatus(plan);
      const savedPlan = db.createPlan(initializedPlan);
      const firstStep = savedPlan.steps[0];

      // 创建高优先级问题
      issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '高优先级问题',
        '描述',
        '影响',
        IssuePriority.HIGH
      );

      // 创建中优先级问题
      issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '中优先级问题',
        '描述',
        '影响',
        IssuePriority.MEDIUM
      );

      // 创建低优先级问题
      const lowPriorityIssue = issueTracker.createIssue(
        savedPlan.id,
        firstStep.id,
        '低优先级问题',
        '描述',
        '影响',
        IssuePriority.LOW
      );

      // 关闭一个问题
      issueTracker.closeIssue(savedPlan.id, lowPriorityIssue!.id);

      // 获取统计信息
      const statistics = issueTracker.getIssueStatistics(savedPlan.id);

      expect(statistics).toBeDefined();
      expect(statistics.total).toBe(3);
      expect(statistics.byPriority[IssuePriority.HIGH]).toBe(1);
      expect(statistics.byPriority[IssuePriority.MEDIUM]).toBe(1);
      expect(statistics.byPriority[IssuePriority.LOW]).toBe(1);
      expect(statistics.byStatus[IssueStatus.PENDING]).toBe(2);
      expect(statistics.byStatus[IssueStatus.IN_PROGRESS]).toBe(0);
      expect(statistics.byStatus[IssueStatus.RESOLVED]).toBe(1);
    });
  });
});