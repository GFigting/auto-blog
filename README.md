# 个人博客

一个使用 Next.js 14 和 Tailwind CSS 构建的个人博客前端项目，支持 Markdown 文章渲染和代码高亮。

## 技术栈

- **框架**：Next.js 14（App Router）
- **样式**：Tailwind CSS
- **Markdown渲染**：react-markdown
- **图标**：Lucide React
- **部署平台**：Vercel

## 功能特性

- ✅ 响应式设计，适配桌面、平板和移动设备
- ✅ Markdown 文章渲染
- ✅ 代码高亮显示
- ✅ 文章分类和标签功能
- ✅ 文章列表和详情页
- ✅ 关于页面
- ✅ 导航菜单
- ✅ 页脚信息

## 项目结构

```
blog/
├── app/
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 应用布局
│   ├── page.tsx            # 主页
│   ├── about/              # 关于页面
│   ├── posts/              # 文章相关页面
│   └── categories/         # 分类相关页面
├── components/             # 组件
├── data/                   # 数据
│   └── posts/              # Markdown 文章
├── lib/                    # 工具函数
├── public/                 # 静态资源
└── ...                     # 配置文件
```

## 开始使用

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 添加文章

在 `data/posts/` 目录下创建 Markdown 文件，文章格式如下：

```markdown
---
title: "文章标题"
date: "2024-01-01"
category: "分类"
tags: ["标签1", "标签2"]
description: "文章描述"
---

文章内容...
```

## 部署到 Vercel

1. 登录 Vercel 账号
2. 点击 "New Project"
3. 选择你的 GitHub 仓库
4. 点击 "Import"
5. 保持默认配置，点击 "Deploy"

部署完成后，Vercel 会提供一个访问链接。

## 自定义配置

### 修改主题色

在 `tailwind.config.js` 中修改 `theme.extend.colors`：

```javascript
colors: {
  primary: '#3b82f6',  // 主色调
  secondary: '#6b7280', // 次要色调
  dark: '#1f2937',      // 深色
},
```

### 修改导航菜单

在 `components/Header.tsx` 中修改导航链接。

## License

MIT