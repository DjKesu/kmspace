import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
}

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.slug} className="border p-4 rounded-lg">
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </Link>
          <p className="mt-2">{post.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}