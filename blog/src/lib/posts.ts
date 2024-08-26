import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'content');

export function getPosts() {
  const fullPath = path.join(postsDirectory, 'posts.json');
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}

export function getPostBySlug(slug: string) {
  const posts = getPosts();
  return posts.find((post: any) => post.slug === slug) || null;
}

export function savePost(post: any) {
  const posts = getPosts();
  posts.push(post);
  const fullPath = path.join(postsDirectory, 'posts.json');
  fs.writeFileSync(fullPath, JSON.stringify(posts, null, 2), 'utf8');
}