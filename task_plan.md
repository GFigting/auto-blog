# Chatbot支持回答任何问题功能实现计划

## 功能概述
为现有的GitHub Chatbot添加AI问答功能，使Chatbot能够回答用户在PR描述或评论中提出的任何问题。

## 技术方案

### 1. AI模型选择
- 使用OpenAI GPT模型作为问答引擎
- 需要配置OpenAI API密钥

### 2. 命令设计
- 添加新命令格式：`@chatbot <问题内容>`
- 或者明确的命令格式：`@chatbot ask <问题内容>`

### 3. 实现步骤

#### 3.1 配置API密钥
- 在GitHub仓库中添加`OPENAI_API_KEY`密钥
- 在workflow中引用该密钥

#### 3.2 修改命令解析逻辑
- 更新`Parse commands`步骤，添加对问答命令的识别
- 提取用户的问题内容

#### 3.3 添加AI问答功能
- 在`Generate response`步骤中添加调用OpenAI API的逻辑
- 处理API响应并格式化为Markdown

#### 3.4 更新帮助文档
- 在`help`命令的响应中添加新功能的说明

### 4. 安全性考虑
- 使用GitHub Secrets安全存储API密钥
- 添加基本的输入验证，防止恶意请求

### 5. 用户体验优化
- 清晰的响应格式，区分AI回答和其他Chatbot响应
- 处理API调用失败的情况，提供友好的错误信息

## 实现细节

### 1. 命令解析修改
- 修改正则表达式，识别`@chatbot`后跟非命令内容的情况
- 提取问题内容并保存到输出变量

### 2. API调用实现
- 使用curl命令调用OpenAI API
- 处理JSON响应
- 格式化回答内容

### 3. 响应格式设计
```markdown
### 🤖 AI Answer

**Question**: 用户的问题

**Answer**:
AI模型生成的回答
```

## 测试计划

1. 在PR描述中使用`@chatbot 什么是Next.js？`测试基本问答功能
2. 在PR评论中使用`@chatbot ask 如何优化React性能？`测试明确命令格式
3. 测试API调用失败时的错误处理
4. 测试多命令组合使用（如`@chatbot summary 同时解释一下这个PR的主要变更`）

## 潜在风险

1. API调用成本：需要监控API使用情况
2. 响应时间：AI模型调用可能需要较长时间
3. 内容安全：需要考虑AI生成内容的安全性
