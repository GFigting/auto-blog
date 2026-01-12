import { v4 as uuidv4 } from 'uuid';
import { Issue, IssuePriority, IssueStatus } from '../models';
import { db } from '../utils/database';

class IssueTracker {
  /**
   * 创建新问题
   */
  createIssue(
    planId: string,
    stepId: string,
    title: string,
    description: string,
    impact: string,
    priority: IssuePriority,
    temporarySolution?: string
  ): Issue | undefined {
    const plan = db.getPlanById(planId);
    if (!plan) return undefined;

    // 检查步骤是否存在
    const step = plan.steps.find(s => s.id === stepId);
    if (!step) return undefined;

    const today = new Date();
    const newIssue: Issue = {
      id: uuidv4(),
      stepId,
      title,
      description,
      impact,
      priority,
      status: IssueStatus.PENDING,
      temporarySolution,
      createdAt: today,
      updatedAt: today
    };

    // 更新计划
    const updatedPlan = { ...plan };
    updatedPlan.issues.push(newIssue);
    updatedPlan.updatedAt = today;

    // 保存更新后的计划
    const savedPlan = db.updatePlan(updatedPlan);
    return savedPlan ? newIssue : undefined;
  }

  /**
   * 更新问题
   */
  updateIssue(
    planId: string,
    issueId: string,
    updates: Partial<Issue>
  ): Issue | undefined {
    const plan = db.getPlanById(planId);
    if (!plan) return undefined;

    const issueIndex = plan.issues.findIndex(issue => issue.id === issueId);
    if (issueIndex === -1) return undefined;

    // 更新问题
    const updatedIssue = { ...plan.issues[issueIndex], ...updates };
    updatedIssue.updatedAt = new Date();

    // 如果问题状态变为已解决，设置解决时间
    if (updates.status === IssueStatus.RESOLVED && !updatedIssue.resolvedAt) {
      updatedIssue.resolvedAt = new Date();
    }

    // 更新计划
    const updatedPlan = { ...plan };
    updatedPlan.issues[issueIndex] = updatedIssue;
    updatedPlan.updatedAt = new Date();

    // 保存更新后的计划
    const savedPlan = db.updatePlan(updatedPlan);
    return savedPlan ? updatedIssue : undefined;
  }

  /**
   * 关闭问题（标记为已解决）
   */
  closeIssue(planId: string, issueId: string): Issue | undefined {
    return this.updateIssue(planId, issueId, {
      status: IssueStatus.RESOLVED
    });
  }

  /**
   * 删除问题
   */
  deleteIssue(planId: string, issueId: string): boolean {
    const plan = db.getPlanById(planId);
    if (!plan) return false;

    const initialLength = plan.issues.length;
    const updatedIssues = plan.issues.filter(issue => issue.id !== issueId);

    if (updatedIssues.length === initialLength) return false;

    // 更新计划
    const updatedPlan = { ...plan };
    updatedPlan.issues = updatedIssues;
    updatedPlan.updatedAt = new Date();

    // 保存更新后的计划
    const savedPlan = db.updatePlan(updatedPlan);
    return savedPlan !== undefined;
  }

  /**
   * 根据ID获取问题
   */
  getIssueById(planId: string, issueId: string): Issue | undefined {
    const plan = db.getPlanById(planId);
    if (!plan) return undefined;

    return plan.issues.find(issue => issue.id === issueId);
  }

  /**
   * 获取计划中的所有问题
   */
  getIssuesByPlanId(planId: string): Issue[] {
    return db.getIssuesByPlanId(planId);
  }

  /**
   * 获取特定步骤的问题
   */
  getIssuesByStepId(planId: string, stepId: string): Issue[] {
    return db.getIssuesByStepId(planId, stepId);
  }

  /**
   * 按优先级获取问题
   */
  getIssuesByPriority(planId: string, priority: IssuePriority): Issue[] {
    const plan = db.getPlanById(planId);
    if (!plan) return [];

    return plan.issues.filter(issue => issue.priority === priority);
  }

  /**
   * 按状态获取问题
   */
  getIssuesByStatus(planId: string, status: IssueStatus): Issue[] {
    const plan = db.getPlanById(planId);
    if (!plan) return [];

    return plan.issues.filter(issue => issue.status === status);
  }

  /**
   * 获取问题统计信息
   */
  getIssueStatistics(planId: string): {
    total: number;
    byStatus: Record<IssueStatus, number>;
    byPriority: Record<IssuePriority, number>;
  } {
    const issues = db.getIssuesByPlanId(planId);
    
    // 按状态统计
    const byStatus: Record<IssueStatus, number> = {
      [IssueStatus.PENDING]: 0,
      [IssueStatus.IN_PROGRESS]: 0,
      [IssueStatus.RESOLVED]: 0
    };
    
    // 按优先级统计
    const byPriority: Record<IssuePriority, number> = {
      [IssuePriority.HIGH]: 0,
      [IssuePriority.MEDIUM]: 0,
      [IssuePriority.LOW]: 0
    };
    
    issues.forEach(issue => {
      byStatus[issue.status]++;
      byPriority[issue.priority]++;
    });
    
    return {
      total: issues.length,
      byStatus,
      byPriority
    };
  }
}

export const issueTracker = new IssueTracker();