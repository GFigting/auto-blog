import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 定义文章元数据类型
export interface PostMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

// 定义文章类型
export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

// 获取文章目录路径
const postsDirectory = path.join(process.cwd(), 'data', 'posts');

/**
 * 获取所有文章的slug列表
 */
export const getPostSlugs = (): string[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
};

/**
 * 根据slug获取单篇文章
 */
export const getPostBySlug = (slug: string): Post => {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    meta: data as PostMeta,
    content,
  };
};

/**
 * 获取所有文章，按日期倒序排列
 */
export const getAllPosts = (): Post[] => {
  const slugs = getPostSlugs();
  const posts = slugs.map(slug => getPostBySlug(slug));
  
  // 按日期倒序排列
  return posts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
};

/**
 * 获取所有分类
 */
export const getAllCategories = (): string[] => {
  const posts = getAllPosts();
  const categories = new Set<string>();
  
  posts.forEach(post => {
    categories.add(post.meta.category);
  });
  
  return Array.from(categories).sort();
};

/**
 * 根据分类获取文章
 */
export const getPostsByCategory = (category: string): Post[] => {
  const posts = getAllPosts();
  return posts.filter(post => post.meta.category === category);
};

/**
 * 获取所有标签
 */
export const getAllTags = (): string[] => {
  const posts = getAllPosts();
  const tags = new Set<string>();
  
  posts.forEach(post => {
    post.meta.tags.forEach(tag => {
      tags.add(tag);
    });
  });
  
  return Array.from(tags).sort();
};