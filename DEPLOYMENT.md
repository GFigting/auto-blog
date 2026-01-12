# Vercel 部署指南

本指南将帮助您将个人博客项目部署到 Vercel 平台。

## 前置条件

- 一个 Vercel 账号（可在 [vercel.com](https://vercel.com) 免费注册）
- Node.js 环境（推荐版本 18.x 或更高）
- npm 或 yarn 包管理器

## 部署步骤

### 1. 安装 Vercel CLI

打开终端，执行以下命令安装 Vercel CLI：

```bash
npm install -g vercel
```

### 2. 登录 Vercel

执行以下命令登录 Vercel 账号：

```bash
vercel login
```

系统会提示您访问一个 URL 并输入验证码。按照提示在浏览器中完成认证。

### 3. 部署项目

在项目根目录下执行以下命令：

```bash
vercel deploy
```

Vercel CLI 会引导您完成部署过程。您可以按照以下方式回答提示：

```
? Set up and deploy “~/path/to/your/project”? [Y/n] Y
? Which scope do you want to deploy to? (选择您的 Vercel 账号)
? Link to existing project? [y/N] N
? What’s your project’s name? (输入项目名称，或使用默认值)
? In which directory is your code located? ./ (直接按 Enter)
```

### 4. 部署生产版本

开发版本部署完成后，您可以执行以下命令部署生产版本：

```bash
vercel deploy --prod
```

### 5. 访问部署后的网站

部署完成后，Vercel 会提供一个 URL（通常是 `https://your-project.vercel.app`），您可以通过该 URL 访问您的博客。

## 自定义域名（可选）

如果您有自己的域名，可以在 Vercel 控制台中为项目配置自定义域名：

1. 登录 Vercel 控制台
2. 选择您的项目
3. 点击 "Settings" -> "Domains"
4. 输入您的域名并点击 "Add"
5. 按照提示在您的域名注册商处配置 DNS 记录

## 自动部署（通过 GitHub）

本项目支持两种 GitHub 自动部署方式：

### 方式一：通过 Vercel 控制台关联（推荐）

1. 将项目推送到 GitHub 仓库
2. 登录 Vercel 控制台
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. 点击 "Import"
6. 保持默认配置，点击 "Deploy"

这样，每当您向 GitHub 仓库推送代码时，Vercel 会自动构建并部署您的项目。

### 方式二：通过 GitHub Actions 工作流

项目已包含预配置的 GitHub Actions 工作流文件 `.github/workflows/deploy.yml`，用于自动部署到 Vercel。

#### 配置步骤：

1. **获取 Vercel 访问令牌**：
   - 登录 Vercel 控制台
   - 点击右上角头像 -> "Settings" -> "Tokens"
   - 创建新令牌，命名为 "GITHUB_ACTION_TOKEN"，复制生成的令牌

2. **获取 Vercel 组织 ID 和项目 ID**：
   - 在 Vercel 控制台中，进入您的项目
   - 点击 "Settings" -> "General"
   - 在 "Project Information" 部分找到 "Project ID" 和 "Org ID"

3. **在 GitHub 仓库中添加密钥**：
   - 进入您的 GitHub 仓库
   - 点击 "Settings" -> "Secrets and variables" -> "Actions"
   - 点击 "New repository secret"，添加以下密钥：
     - `VERCEL_TOKEN`: 您的 Vercel 访问令牌
     - `VERCEL_ORG_ID`: 您的 Vercel 组织 ID
     - `VERCEL_PROJECT_ID`: 您的 Vercel 项目 ID

4. **推送代码到主分支**：
   - 当您将代码推送到 `main` 或 `master` 分支时，GitHub Actions 会自动触发构建和部署流程

#### 工作流说明：
- 工作流会在代码推送到 `main` 或 `master` 分支时触发
- 首先执行构建步骤，确保项目可以正常构建
- 构建成功后，自动部署到 Vercel 生产环境
- 您可以在 GitHub 仓库的 "Actions" 标签页中查看部署状态和日志

## 常见问题

### 1. 部署失败

如果部署失败，请检查以下几点：

- 确保项目可以正常构建（执行 `npm run build` 无错误）
- 检查 Vercel 控制台中的构建日志，查看具体错误信息
- 确保项目依赖已正确安装

### 2. 访问页面时出现 404 错误

- 检查页面路由是否正确
- 确保 Markdown 文章文件已正确放置在 `data/posts/` 目录下
- 检查 `lib/markdown.ts` 中的文件路径是否正确

### 3. 样式显示异常

- 确保 Tailwind CSS 已正确配置
- 检查 `app/globals.css` 中的样式是否正确引入

## 联系方式

如果您在部署过程中遇到问题，可以查看 [Vercel 文档](https://vercel.com/docs) 或联系 Vercel 支持。