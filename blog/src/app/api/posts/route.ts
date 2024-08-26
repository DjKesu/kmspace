import { NextResponse } from 'next/server';
import { savePost } from '@/lib/posts';

export async function POST(request: Request) {
  const post = await request.json();
  
  if (!post.title || !post.slug || !post.content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    savePost(post);
    return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: 'Error saving post' }, { status: 500 });
  }
}