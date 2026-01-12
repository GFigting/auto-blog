# 工作流智能体

一个用于系统化管理任务执行流程的智能体，提供计划生成、状态管理、问题追踪和进度监控功能。

## 核心功能

### 1. 计划步骤初始化
- 自动生成结构化的计划步骤列表
- 包含步骤ID、名称、详细描述、预期完成时间、依赖关系和初始状态
- 支持自定义步骤模板

### 2. 状态动态更新
- 自动或手动触发步骤状态更新
- 验证步骤完成的前置条件（如测试通过率）
- 自动更新依赖步骤状态
- 同步更新计划整体进度

### 3. 问题记录机制
- 自动捕获或手动录入问题信息
- 包含问题ID、关联步骤、发生时间、详细描述、影响范围和处理状态
- 支持优先级标记（高/中/低）
- 支持问题全生命周期管理

## 技术栈

- **语言**：TypeScript
- **框架**：Express.js
- **数据存储**：内存存储（可扩展为数据库）
- **测试**：Jest
- **构建工具**：TypeScript Compiler (tsc)
- **CI/CD**：GitHub Actions

## 项目结构

```
workflow-agent/
├── src/
│   ├── models/         # 数据模型定义
│   ├── modules/        # 核心功能模块
│   │   ├── PlanGenerator.ts   # 计划生成模块
│   │   ├── StatusManager.ts   # 状态管理模块
│   │   └── IssueTracker.ts    # 问题追踪模块
│   ├── api/            # API接口定义
│   ├── utils/          # 工具函数
│   └── index.ts        # 服务器入口
├── tests/              # 测试用例
├── dist/               # 编译产物
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript配置
├── jest.config.js      # Jest配置
└── .github/workflows/  # GitHub Actions配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

### 运行测试

```bash
npm test
```

## API接口文档

### 计划管理

#### 创建计划

```
POST /api/plans
Content-Type: application/json

{
  "name": "项目开发计划",
  "description": "完整的项目开发流程",
  "startDate": "2024-01-01"
}
```

#### 获取所有计划

```
GET /api/plans
```

#### 获取计划详情

```
GET /api/plans/:id
```

#### 更新计划

```
PUT /api/plans/:id
Content-Type: application/json

{
  "name": "更新后的计划名称",
  "description": "更新后的计划描述"
}
```

#### 删除计划

```
DELETE /api/plans/:id
```

### 步骤管理

#### 更新步骤状态

```
PUT /api/plans/:planId/steps/:stepId/status
Content-Type: application/json

{
  "status": "COMPLETED",
  "testResults": {
    "passed": true,
    "details": "所有测试通过",
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

#### 获取步骤依赖图

```
GET /api/plans/:planId/steps/dependency-graph
```

### 问题管理

#### 创建问题

```
POST /api/issues
Content-Type: application/json

{
  "title": "代码编译错误",
  "description": "TypeScript编译时出现语法错误",
  "stepId": "step-123",
  "priority": "HIGH"
}
```

#### 获取所有问题

```
GET /api/issues
```

#### 获取计划相关问题

```
GET /api/plans/:planId/issues
```

#### 更新问题

```
PUT /api/issues/:id
Content-Type: application/json

{
  "title": "更新后的问题标题",
  "status": "IN_PROGRESS",
  "solution": "正在修复中"
}
```

#### 关闭问题

```
PUT /api/issues/:id/close
Content-Type: application/json

{
  "solution": "问题已修复，重新编译通过"
}
```

#### 获取问题统计

```
GET /api/issues/statistics
```

## 数据模型

### Plan（计划）

| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | string | 计划ID |
| name | string | 计划名称 |
| description | string | 计划描述 |
| steps | PlanStep[] | 计划步骤列表 |
| progress | number | 计划进度百分比 |
| createdAt | Date | 创建时间 |
| updatedAt | Date | 更新时间 |

### PlanStep（计划步骤）

| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | string | 步骤ID |
| name | string | 步骤名称 |
| description | string | 步骤描述 |
| status | Status | 步骤状态（NOT_STARTED/PENDING/IN_PROGRESS/COMPLETED/FAILED） |
| dependencies | string[] | 依赖的步骤ID列表 |
| expectedCompletionTime | Date | 预期完成时间 |
| completedAt | Date | 实际完成时间 |
| testResults | TestResults | 测试结果 |
| createdAt | Date | 创建时间 |
| updatedAt | Date | 更新时间 |

### Issue（问题）

| 字段名 | 类型 | 描述 |
|--------|------|------|
| id | string | 问题ID |
| title | string | 问题标题 |
| description | string | 问题描述 |
| stepId | string | 关联的步骤ID |
| priority | Priority | 优先级（HIGH/MEDIUM/LOW） |
| status | IssueStatus | 状态（PENDING/IN_PROGRESS/RESOLVED） |
| impact | string | 影响范围 |
| solution | string | 解决方案 |
| createdAt | Date | 创建时间 |
| updatedAt | Date | 更新时间 |

## 状态转换规则

- **NOT_STARTED** → IN_PROGRESS, PENDING, COMPLETED
- **PENDING** → IN_PROGRESS
- **IN_PROGRESS** → COMPLETED, FAILED
- **COMPLETED** → 无
- **FAILED** → IN_PROGRESS

## 测试说明

项目包含以下测试套件：

1. **PlanGenerator.test.ts** - 测试计划生成功能
2. **StatusManager.test.ts** - 测试状态管理功能
3. **IssueTracker.test.ts** - 测试问题追踪功能

运行测试：

```bash
npm test
```

## 部署指南

### GitHub Actions 自动部署

项目已配置GitHub Actions，当代码推送到main/master分支或创建PR时，会自动执行以下步骤：

1. 设置Node.js环境
2. 安装依赖
3. 编译TypeScript代码
4. 运行测试

### 手动部署

1. 编译代码：

```bash
npm run build:only
```

2. 启动服务器：

```bash
npm start
```

3. （可选）使用进程管理工具（如PM2）保持服务运行：

```bash
pm install -g pm2
pm start
```

## 扩展建议

1. **持久化存储**：将内存存储替换为数据库（如MongoDB、PostgreSQL）
2. **用户认证**：添加JWT认证机制，保护API接口
3. **前端界面**：开发React/Vue前端应用，提供可视化操作界面
4. **通知系统**：添加邮件或消息通知，及时提醒状态变化
5. **历史记录**：记录所有操作历史，支持审计和回溯

## License

MIT
