import express from 'express';
import { planGenerator } from '../modules/PlanGenerator';
import { statusManager } from '../modules/StatusManager';
import { issueTracker } from '../modules/IssueTracker';
import { db } from '../utils/database';
import { Plan, Status, IssuePriority, IssueStatus } from '../models';

const router = express.Router();

// 计划管理

// 获取所有计划
router.get('/plans', (req, res) => {
  const plans = db.getAllPlans();
  res.json(plans);
});

// 获取单个计划
router.get('/plans/:id', (req, res) => {
  const plan = db.getPlanById(req.params.id);
  if (plan) {
    res.json(plan);
  } else {
    res.status(404).json({ message: '计划不存在' });
  }
});

// 创建默认计划
router.post('/plans/default', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: '缺少必要参数' });
  }

  try {
    const plan = planGenerator.generateDefaultPlan(name, description);
    const initializedPlan = statusManager.initializeStepsStatus(plan);
    const savedPlan = db.createPlan(initializedPlan);
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: '创建计划失败', error: (error as Error).message });
  }
});

// 创建自定义计划
router.post('/plans/custom', (req, res) => {
  const { name, description, steps } = req.body;
  if (!name || !description || !steps || !Array.isArray(steps)) {
    return res.status(400).json({ message: '缺少必要参数' });
  }

  try {
    const plan = planGenerator.generateCustomPlan(name, description, steps);
    const initializedPlan = statusManager.initializeStepsStatus(plan);
    const savedPlan = db.createPlan(initializedPlan);
    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: '创建计划失败', error: (error as Error).message });
  }
});

// 更新计划
router.put('/plans/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const plan = db.getPlanById(id);
  if (!plan) {
    return res.status(404).json({ message: '计划不存在' });
  }

  try {
    const updatedPlan = { ...plan, ...updates, updatedAt: new Date() };
    const savedPlan = db.updatePlan(updatedPlan);
    res.json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: '更新计划失败', error: (error as Error).message });
  }
});

// 删除计划
router.delete('/plans/:id', (req, res) => {
  const { id } = req.params;
  const deleted = db.deletePlan(id);
  if (deleted) {
    res.json({ message: '计划已删除' });
  } else {
    res.status(404).json({ message: '计划不存在' });
  }
});

// 步骤管理

// 获取计划的所有步骤
router.get('/plans/:id/steps', (req, res) => {
  const { id } = req.params;
  const steps = db.getStepsByPlanId(id);
  res.json(steps);
});

// 更新步骤状态
router.put('/plans/:planId/steps/:stepId/status', (req, res) => {
  const { planId, stepId } = req.params;
  const { status, testResults } = req.body;

  if (!status || !Object.values(Status).includes(status)) {
    return res.status(400).json({ message: '无效的状态' });
  }

  try {
    const updatedPlan = statusManager.updateStepStatus(planId, stepId, status, testResults);
    if (updatedPlan) {
      res.json(updatedPlan);
    } else {
      res.status(404).json({ message: '计划或步骤不存在' });
    }
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

// 获取步骤的依赖关系图
router.get('/plans/:id/dependency-graph', (req, res) => {
  const { id } = req.params;
  const plan = db.getPlanById(id);
  if (!plan) {
    return res.status(404).json({ message: '计划不存在' });
  }

  const graph = statusManager.getDependencyGraph(plan);
  res.json(graph);
});

// 问题管理

// 获取计划的所有问题
router.get('/plans/:id/issues', (req, res) => {
  const { id } = req.params;
  const issues = db.getIssuesByPlanId(id);
  res.json(issues);
});

// 获取特定步骤的问题
router.get('/plans/:planId/steps/:stepId/issues', (req, res) => {
  const { planId, stepId } = req.params;
  const issues = db.getIssuesByStepId(planId, stepId);
  res.json(issues);
});

// 创建问题
router.post('/plans/:planId/steps/:stepId/issues', (req, res) => {
  const { planId, stepId } = req.params;
  const { title, description, impact, priority, temporarySolution } = req.body;

  if (!title || !description || !impact || !priority) {
    return res.status(400).json({ message: '缺少必要参数' });
  }

  if (!Object.values(IssuePriority).includes(priority)) {
    return res.status(400).json({ message: '无效的优先级' });
  }

  try {
    const issue = issueTracker.createIssue(
      planId,
      stepId,
      title,
      description,
      impact,
      priority,
      temporarySolution
    );

    if (issue) {
      res.status(201).json(issue);
    } else {
      res.status(404).json({ message: '计划或步骤不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: '创建问题失败', error: (error as Error).message });
  }
});

// 更新问题
router.put('/plans/:planId/issues/:issueId', (req, res) => {
  const { planId, issueId } = req.params;
  const updates = req.body;

  // 验证状态和优先级（如果提供）
  if (updates.status && !Object.values(IssueStatus).includes(updates.status)) {
    return res.status(400).json({ message: '无效的状态' });
  }

  if (updates.priority && !Object.values(IssuePriority).includes(updates.priority)) {
    return res.status(400).json({ message: '无效的优先级' });
  }

  try {
    const updatedIssue = issueTracker.updateIssue(planId, issueId, updates);
    if (updatedIssue) {
      res.json(updatedIssue);
    } else {
      res.status(404).json({ message: '计划或问题不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: '更新问题失败', error: (error as Error).message });
  }
});

// 关闭问题
router.put('/plans/:planId/issues/:issueId/close', (req, res) => {
  const { planId, issueId } = req.params;

  try {
    const closedIssue = issueTracker.closeIssue(planId, issueId);
    if (closedIssue) {
      res.json(closedIssue);
    } else {
      res.status(404).json({ message: '计划或问题不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: '关闭问题失败', error: (error as Error).message });
  }
});

// 删除问题
router.delete('/plans/:planId/issues/:issueId', (req, res) => {
  const { planId, issueId } = req.params;

  try {
    const deleted = issueTracker.deleteIssue(planId, issueId);
    if (deleted) {
      res.json({ message: '问题已删除' });
    } else {
      res.status(404).json({ message: '计划或问题不存在' });
    }
  } catch (error) {
    res.status(500).json({ message: '删除问题失败', error: (error as Error).message });
  }
});

// 获取问题统计信息
router.get('/plans/:id/issues/statistics', (req, res) => {
  const { id } = req.params;
  const statistics = issueTracker.getIssueStatistics(id);
  res.json(statistics);
});

export default router;