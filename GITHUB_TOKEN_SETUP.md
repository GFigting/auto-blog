# GitHub Token 配置指南

## 一、GITHUB_TOKEN 简介

GitHub Actions 提供了一个自动生成的令牌 `GITHUB_TOKEN`，用于在工作流中与 GitHub API 进行交互。这个令牌具有仓库的读写权限，但有一些限制：

- 它的权限范围仅限于当前仓库
- 默认情况下，它可能没有足够的权限执行某些操作（如创建 PR 时的某些场景）
- 它不能触发其他工作流（防止循环触发）

## 二、配置工作流权限

### 1. 在工作流文件中设置权限

您可以在 `.github/workflows/autopr.yml` 文件中添加 `permissions` 部分来明确指定所需的权限：

```yaml
permissions:
  contents: write       # 允许读写仓库内容
  pull-requests: write  # 允许创建和管理 PR
```

### 2. 检查当前工作流配置

当前 `autopr.yml` 文件已包含基本权限配置，这是解决之前 403 错误的第一步。

## 三、使用个人访问令牌（PAT）

如果默认的 `GITHUB_TOKEN` 仍然权限不足，您可以创建一个个人访问令牌并将其存储为仓库密钥：

### 1. 创建个人访问令牌

1. 登录 GitHub，点击右上角头像 → `Settings`
2. 在左侧菜单中选择 `Developer settings` → `Personal access tokens` → `Tokens (classic)`
3. 点击 `Generate new token` → `Generate new token (classic)`
4. 设置令牌名称（如 `auto-pr-token`）
5. 设置过期时间
6. 勾选所需权限：
   - `repo`：全选，用于访问仓库和创建 PR
   - 其他根据需要选择
7. 点击 `Generate token`
8. 复制生成的令牌（注意：只显示一次）

### 2. 将令牌存储为仓库密钥

1. 进入您的 GitHub 仓库 → `Settings` → `Secrets and variables` → `Actions`
2. 点击 `New repository secret`
3. 名称填写 `GH_TOKEN`（与工作流文件中引用的名称一致）
4. 值粘贴刚才复制的个人访问令牌
5. 点击 `Add secret`

### 3. 在工作流中使用个人访问令牌

修改 `autopr.yml` 文件，优先使用 `GH_TOKEN`：

```yaml
github_token: ${{ secrets.GITHUB_TOKEN || secrets.GH_TOKEN }}
```

## 四、解决常见问题

### 1. "Resource not accessible by integration" 错误

这是权限不足的典型错误。解决方法：
- 确保工作流文件中设置了正确的 `permissions`
- 尝试使用个人访问令牌（PAT）替代默认的 `GITHUB_TOKEN`

### 2. 检查工作流运行状态

您可以在 GitHub 仓库的 `Actions` 标签页中查看工作流运行的详细日志，了解具体的错误信息。

### 3. 代理配置

如果在本地开发时遇到网络问题，确保 git 代理配置正确：

```bash
git config --global http.proxy http://127.0.0.1:7897
git config --global https.proxy http://127.0.0.1:7897
```

## 五、最佳实践

1. 最小权限原则：只授予工作流所需的最小权限
2. 定期轮换令牌：避免长期使用同一个令牌
3. 保护令牌安全：不要将令牌硬编码在代码中，始终使用 GitHub Secrets
4. 监控工作流：定期检查工作流运行状态，及时发现问题

如果您按照上述步骤操作后仍然遇到问题，请查看 GitHub Actions 的官方文档或在 GitHub Community 中寻求帮助。