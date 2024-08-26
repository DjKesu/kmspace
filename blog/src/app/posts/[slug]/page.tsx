import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownImage from '@/components/MarkdownImage';

export default function Post({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container relative">
      <Link href="/" className="absolute top-4 right-0 text-black hover:underline">
        Home
      </Link>
      <article className="mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="prose lg:prose-xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              img: MarkdownImage
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}