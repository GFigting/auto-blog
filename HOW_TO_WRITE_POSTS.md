# 项目文章撰写教程

欢迎使用本项目的博客文章撰写教程！本教程将详细介绍如何在本项目中创建、编写和发布博客文章。

## 文章格式与结构

### 1. 文件格式

所有博客文章都使用 **Markdown** 格式编写，文件扩展名必须为 `.md`。

### 2. 文件位置

所有文章必须存放在项目根目录下的 `data/posts/` 目录中。

### 3. 文章结构

每篇文章由两部分组成：

#### 3.1 YAML 前置元数据

文章开头必须包含 YAML 格式的元数据块，使用 `---` 分隔。这部分元数据用于定义文章的基本信息。

**必填字段：**

| 字段名 | 类型 | 描述 | 示例 |
|-------|------|------|------|
| `title` | 字符串 | 文章标题 | `"Hello World"` |
| `date` | 字符串 | 发布日期（ISO 格式） | `"2024-01-01"` |
| `category` | 字符串 | 文章分类 | `"技术"` |
| `tags` | 字符串数组 | 文章标签 | `["JavaScript", "Next.js"]` |
| `description` | 字符串 | 文章描述（用于 SEO 和列表展示） | `"这是我的第一篇博客文章..."` |

**可选字段：**

| 字段名 | 类型 | 描述 | 示例 |
|-------|------|------|------|
| `author` | 字符串 | 文章作者 | `"张三"` |

**示例元数据：**

```yaml
---
title: "Hello World"
date: "2024-01-01"
category: "技术"
tags: ["JavaScript", "Next.js"]
description: "这是我的第一篇博客文章，介绍了如何使用Next.js创建个人博客。"
author: "张三"
---
```

#### 3.2 Markdown 内容

元数据之后是文章的主体内容，使用标准 Markdown 语法编写。

## 创建新文章

### 1. 新建文件

在 `data/posts/` 目录下创建一个新的 Markdown 文件，文件名建议使用简短的英文描述，以 `-` 分隔单词，例如：

```
my-first-post.md
nextjs-tutorial.md
web-development-trends-2024.md
```

### 2. 添加元数据

在文件开头添加 YAML 元数据块，填写所有必填字段。

### 3. 编写内容

使用 Markdown 语法编写文章内容。

## Markdown 语法指南

### 1. 标题

使用 `#` 符号创建标题：

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

### 2. 段落与换行

直接输入文本即可创建段落。段落之间需要空一行。

要创建换行而不是新段落，可以在行尾添加两个空格。

### 3. 强调

```markdown
**粗体文本**
*斜体文本*
***粗斜体文本***
```

### 4. 列表

#### 无序列表

```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2
```

#### 有序列表

```markdown
1. 第一步
2. 第二步
   1. 子步骤 2.1
   2. 子步骤 2.2
```

### 5. 链接

```markdown
[链接文本](https://example.com)
```

### 6. 图片

```markdown
![图片描述](./images/image.jpg)
```

**图片存储位置：** 所有文章图片应存放在 `public/images/` 目录下。

**图片引用方式：** 使用相对路径引用，例如：

```markdown
![示例图片](/images/example.jpg)
```

### 7. 代码块

#### 行内代码

```markdown
`行内代码示例`
```

#### 代码块

使用三个反引号创建代码块，并可以指定语言以启用语法高亮：

```markdown
```javascript
function helloWorld() {
  console.log("Hello, World!");
}

helloWorld();
```
```

支持的语言包括：JavaScript、TypeScript、Python、HTML、CSS、React、Next.js 等。

### 8. 引用

```markdown
> 这是一段引用文本。
> 
> 引用可以包含多行。
```

### 9. 表格

```markdown
| 列标题 1 | 列标题 2 | 列标题 3 |
|---------|---------|---------|
| 内容 1   | 内容 2   | 内容 3   |
| 内容 4   | 内容 5   | 内容 6   |
```

### 10. 分隔线

```markdown
---
```

## 文章编写规范

### 1. 命名规范

- 文件名使用小写字母，单词之间用 `-` 分隔
- 避免使用特殊字符和空格
- 文件名应简洁明了，能反映文章主题

### 2. 内容规范

- 文章标题应简洁明了，准确反映文章内容
- 使用清晰的标题层级结构
- 段落不宜过长，每段集中表达一个观点
- 代码块应包含适当的注释
- 使用图片时应添加描述性的 alt 文本
- 确保所有链接都是有效的

### 3. SEO 优化

- 标题包含关键词
- 描述字段应简洁概括文章内容
- 使用合适的标签和分类
- 内容结构清晰，便于搜索引擎抓取

## 测试与预览

### 1. 本地预览

在项目根目录下运行开发服务器：

```bash
npm run dev
```

然后在浏览器中访问 `http://localhost:3000` 查看网站。

### 2. 检查文章

- 确保文章在列表页正确显示
- 检查文章的元数据是否正确
- 验证 Markdown 渲染是否正常
- 测试代码高亮是否工作
- 确认图片是否正确加载

## 发布流程

1. 编写并测试文章
2. 使用 Git 提交文章：
   ```bash
   git add data/posts/your-post.md
   git commit -m "Add new post: your-post"
   git push origin stage
   ```
3. 等待自动部署完成

## 示例文章

以下是一个完整的示例文章：

```markdown
---
title: "React Hooks 入门指南"
date: "2024-01-15"
category: "技术"
tags: ["React", "JavaScript", "前端开发"]
description: "本文介绍 React Hooks 的基本概念和使用方法，帮助你更好地理解和应用 Hooks。"
author: "李四"
---

# React Hooks 入门指南

React Hooks 是 React 16.8 中引入的新特性，它允许你在函数组件中使用状态和其他 React 特性，而无需编写类组件。

## 为什么使用 Hooks？

- 更容易复用状态逻辑
- 组件代码更加简洁
- 更容易理解和测试
- 避免了 class 组件中的 this 问题

## 常用 Hooks

### useState

用于在函数组件中添加状态：

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

用于处理副作用，如数据获取、订阅或手动 DOM 操作：

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 自定义 Hooks

你可以创建自己的自定义 Hooks 来复用状态逻辑：

```javascript
import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

## 总结

React Hooks 是 React 中的一个重要特性，它使函数组件更加强大。通过使用 Hooks，你可以编写更加简洁、可复用的组件代码。

---

希望这篇文章对你有所帮助！如果你有任何问题或建议，欢迎在评论区留言。