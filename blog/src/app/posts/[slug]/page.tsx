import Link from 'next/link';
import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownImage from '@/components/MarkdownImage';

// Generic component to render JSON content recursively
const renderJsonContent = (jsonContent: any) => {
  return (
    <div className="space-y-4">
      {Object.keys(jsonContent).map((key) => (
        <div key={key}>
          <h2 className="text-xl font-semibold">{key}</h2>
          {typeof jsonContent[key] === 'object' && !Array.isArray(jsonContent[key]) ? (
            <div className="pl-4">{renderJsonContent(jsonContent[key])}</div>
          ) : Array.isArray(jsonContent[key]) ? (
            <ul className="list-disc pl-5 space-y-2">
              {jsonContent[key].map((item: any, index: number) => (
                <li key={index}>
                  {typeof item === 'object' ? renderJsonContent(item) : item}
                </li>
              ))}
            </ul>
          ) : (
            <p>{jsonContent[key]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

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
          {typeof post.content === 'string' ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ alt = "", ...props }: { alt?: string; [key: string]: any }) => (
                  <MarkdownImage alt={alt || ""} {...props} />
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          ) : (
            renderJsonContent(post.content)
          )}
        </div>
      </article>
    </div>
  );
}
