#!/bin/bash

# 快速提交、推送并创建/更新 PR 的脚本
# 用法: ./scripts/commit-push-pr.sh "提交信息"

set -e

# 检查是否提供了提交信息
if [ -z "$1" ]; then
  echo "❌ 错误: 请提供提交信息"
  echo ""
  echo "用法: ./scripts/commit-push-pr.sh \"提交信息\""
  echo ""
  echo "示例:"
  echo "  ./scripts/commit-push-pr.sh \"Add: new feature\""
  echo "  ./scripts/commit-push-pr.sh \"Fix: resolve bug\""
  exit 1
fi

COMMIT_MSG="$1"
CURRENT_BRANCH=$(git branch --show-current)

# 检查当前分支
if [ "$CURRENT_BRANCH" != "stage" ]; then
  echo "⚠️  警告: 当前不在 stage 分支"
  echo "当前分支: $CURRENT_BRANCH"
  read -p "是否继续? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# 显示状态
echo ""
echo "📋 Git 状态:"
git status --short

echo ""
echo "📝 提交信息: $COMMIT_MSG"
echo "🌿 当前分支: $CURRENT_BRANCH"

# 确认
read -p "确认提交? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 已取消"
  exit 1
fi

# 添加所有更改
echo ""
echo "➕ 添加文件..."
git add .

# 提交
echo "✍️  提交更改..."
git commit -m "$COMMIT_MSG"

# 推送
echo "🚀 推送到远程..."
git push

echo ""
echo "✅ 完成!"
echo ""
echo "📊 后续步骤:"
echo "  1. PR 将自动创建/更新"
echo "  2. Chatbot 会添加评论摘要"
echo "  3. CI 检查通过后会自动合并到 main"
