// 状态枚举
export enum Status {
  NOT_STARTED = '未开始',
  PENDING = '待执行',
  IN_PROGRESS = '进行中',
  COMPLETED = '已完成',
  FAILED = '失败'
}

// 问题优先级枚举
export enum IssuePriority {
  HIGH = '高',
  MEDIUM = '中',
  LOW = '低'
}

// 问题状态枚举
export enum IssueStatus {
  PENDING = '待解决',
  IN_PROGRESS = '解决中',
  RESOLVED = '已解决'
}

// 计划步骤接口
export interface PlanStep {
  id: string;
  name: string;
  description: string;
  expectedCompletionTime: Date;
  dependencies: string[]; // 依赖的步骤ID列表
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  testResults?: {
    passed: boolean;
    details: string;
    timestamp: Date;
  };
}

// 问题接口
export interface Issue {
  id: string;
  stepId: string; // 关联的计划步骤ID
  title: string;
  description: string;
  impact: string;
  priority: IssuePriority;
  status: IssueStatus;
  temporarySolution?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

// 计划接口
export interface Plan {
  id: string;
  name: string;
  description: string;
  steps: PlanStep[];
  issues: Issue[];
  createdAt: Date;
  updatedAt: Date;
  progress: number; // 整体进度百分比
}