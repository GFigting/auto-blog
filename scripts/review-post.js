#!/usr/bin/env node

/**
 * 文章评论生成脚本
 * 用于提取Markdown文章的标题和内容概述，生成评论内容
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * 提取文章的标题和内容概述
 * @param {string} filePath - 文章文件路径
 * @returns {Object} - 包含标题和概述的对象
 */
function extractPostInfo(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // 提取前200个字符作为概述
    const overview = content.replace(/\n/g, ' ').replace(/\s+/g, ' ').substring(0, 200) + '...';
    
    return {
      title: data.title || '未命名文章',
      overview: overview
    };
  } catch (error) {
    console.error(`Error extracting post info: ${error.message}`);
    return null;
  }
}

/**
 * 生成评论内容
 * @param {Object} postInfo - 文章信息对象
 * @returns {string} - 评论内容
 */
function generateComment(postInfo) {
  if (!postInfo) {
    return '无法提取文章信息，请检查文件格式。';
  }
  
  return `## 文章自动评论\n\n### 标题\n${postInfo.title}\n\n### 内容概述\n${postInfo.overview}\n\n---\n\n✅ 自动评论生成完成`;
}

// 主函数
function main() {
  // 获取命令行参数中的文件路径
  const filePath = process.argv[2];
  
  if (!filePath) {
    console.error('请提供文章文件路径');
    process.exit(1);
  }
  
  const fullPath = path.resolve(filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.error('文件不存在');
    process.exit(1);
  }
  
  const postInfo = extractPostInfo(fullPath);
  const comment = generateComment(postInfo);
  
  console.log(comment);
}

if (require.main === module) {
  main();
}

module.exports = { extractPostInfo, generateComment };