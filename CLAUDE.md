# Claude Code 项目配置

## 项目概述

这是一个基于 Next.js 14 的个人博客项目，支持自动部署和 PR 自动合并工作流。

## 技术栈

- **前端**: Next.js 14, React 18, Tailwind CSS
- **语言**: TypeScript
- **部署**: Vercel
- **版本控制**: Git (main/stage 分支)

## 工作流程

```
stage 分支 → 自动创建 PR → PR 评论总结 → 自动合并到 main
```

## Git 操作权限

允许的 Git 命令：
- `git add` - 添加文件到暂存区
- `git commit` - 创建提交
- `git push` - 推送到远程
- `git restore` - 恢复文件

## 开发规范

### 代码检查

- **ESLint**: 使用 `next/core-web-vitals` 预设
- **TypeScript**: 严格模式检查
- **Prettier**: 手动格式化 (`npm run format`)

### 工作流触发

- `code-check.yml`: push 到 stage/main 或 PR 时触发
- `auto-pr.yml`: push 到 stage 时创建 PR
- `pr-review-auto-merge.yml`: PR 打开时评论并自动合并

### 目录结构

```
├── app/              # Next.js App Router
├── components/       # React 组件
├── data/posts/       # 博客文章 (Markdown)
├── lib/              # 工具函数
├── public/           # 静态资源
└── .github/workflows/ # GitHub Actions
```

### 文章格式

创建新文章时，在 `data/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: "文章标题"
date: "2026-01-13"
category: "分类"
tags: ["标签1", "标签2"]
description: "文章描述"
---

# 文章内容

正文内容...
```

## 分支策略

- **main**: 生产分支，自动部署
- **stage**: 开发分支，push 后自动创建 PR 到 main

## 注意事项

1. 提交前确保代码检查通过
2. 文章使用 Markdown 格式，放在 `data/posts/` 目录
3. 不需要手动格式化检查（已从工作流移除）
4. Git 操作需遵循上述权限规则
