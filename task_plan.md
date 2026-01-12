# 个人博客前端项目计划

## 技术栈
- **框架**：Next.js 14（App Router）
- **样式**：Tailwind CSS
- **Markdown渲染**：react-markdown
- **代码高亮**：react-syntax-highlighter
- **图标**：Lucide React
- **部署平台**：Vercel

## 项目结构
```
blog/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx              # 主页
│   ├── about/               # 关于页面
│   │   └── page.tsx
│   ├── posts/               # 文章页面
│   │   ├── [slug]/          # 文章详情页
│   │   │   └── page.tsx
│   │   └── page.tsx         # 文章列表页
│   └── categories/          # 分类页面
│       └── [category]/      # 分类详情页
│           └── page.tsx
├── components/
│   ├── Header.tsx           # 头部组件
│   ├── Footer.tsx           # 底部组件
│   ├── PostCard.tsx         # 文章卡片组件
│   ├── PostContent.tsx      # 文章内容组件
│   ├── CategoryList.tsx     # 分类列表组件
│   └── TagList.tsx          # 标签列表组件
├── data/
│   └── posts/               # Markdown文章文件
│       ├── post-1.md
│       └── post-2.md
├── lib/
│   ├── utils.ts             # 工具函数
│   └── markdown.ts          # Markdown处理函数
├── public/
│   └── images/              # 图片资源
├── tailwind.config.js
├── tsconfig.json
├── next.config.js
└── package.json
```

## 核心功能

### 1. 主页
- 展示最新文章列表
- 显示文章标题、摘要、发布日期、分类和标签
- 支持分页

### 2. 文章详情页
- 渲染Markdown格式的文章内容
- 代码高亮显示
- 文章元信息（发布日期、分类、标签）
- 目录导航（可选）

### 3. 文章列表页
- 按时间顺序展示所有文章
- 支持分页

### 4. 分类功能
- 分类列表展示
- 按分类筛选文章

### 5. 标签功能
- 标签云展示
- 按标签筛选文章

### 6. 关于页面
- 博主个人信息
- 技术栈展示

### 7. 响应式设计
- 适配桌面、平板和移动设备

## 实现步骤

### 1. 初始化项目
- 使用Next.js 14创建项目
- 配置Tailwind CSS
- 安装必要依赖

### 2. 创建基础组件
- Header组件
- Footer组件
- PostCard组件

### 3. 实现Markdown处理
- 读取本地Markdown文件
- 解析Markdown内容和元数据
- 实现代码高亮

### 4. 开发页面
- 主页
- 文章列表页
- 文章详情页
- 分类页面
- 关于页面

### 5. 样式美化
- 使用Tailwind CSS进行样式设计
- 实现响应式布局

### 6. 优化与测试
- 性能优化
- 跨浏览器测试
- 响应式测试

### 7. 部署到Vercel
- 配置Vercel部署
- 提交代码并部署

## 依赖列表
- next: ^14.0.0
- react: ^18.2.0
- react-dom: ^18.2.0
- react-markdown: ^9.0.0
- react-syntax-highlighter: ^15.5.0
- lucide-react: ^0.294.0
- gray-matter: ^4.0.3
- rehype-pretty-code: ^0.10.0
- tailwindcss: ^3.3.0
- typescript: ^5.2.0