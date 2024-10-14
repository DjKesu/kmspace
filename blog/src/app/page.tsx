import Link from 'next/link';
import { getPosts } from '@/lib/posts';

export default function Home() {
  const posts = getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hi, I&apos;m Krish.</h1>
      <p className="mb-6">Find my blogs and thoughts</p>
      <div className="space-y-6">
        {posts.map((post: any) => (
          <div key={post.slug} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`} className="block mb-2">
              <h2 className="text-xl font-semibold hover:underline">{post.title}</h2>
            </Link>
            {post.excerpt && <p className="text-sm">{post.excerpt}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
