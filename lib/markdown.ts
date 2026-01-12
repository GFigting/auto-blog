import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), 'data', 'posts');

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: data as PostMeta,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs.map(slug => getPostBySlug(slug));

  return posts.sort((a, b) => {
    const dateA = new Date(a.meta.date).getTime();
    const dateB = new Date(b.meta.date).getTime();
    return dateB - dateA;
  });
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map(post => post.meta.category));
  return Array.from(categories).sort();
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  return posts.filter(post => post.meta.category === category);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.meta.tags) {
      tags.add(tag);
    }
  }

  return Array.from(tags).sort();
}