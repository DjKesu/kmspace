import { useState } from 'react';
import dynamic from 'next/dynamic';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState(''); // Handles string content
  const [structuredContent, setStructuredContent] = useState({}); // Handles JSON content
  const [isJsonContent, setIsJsonContent] = useState(false); // Toggle for JSON or plain text

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = isJsonContent
        ? { title, slug, content: structuredContent }
        : { title, slug, content };

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setTitle('');
        setSlug('');
        setContent('');
        setStructuredContent({});
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Title"
        required
      />
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Slug"
        required
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={isJsonContent}
            onChange={() => setIsJsonContent(!isJsonContent)}
          />
          Add structured JSON content
        </label>
      </div>
      {isJsonContent ? (
        <textarea
          value={JSON.stringify(structuredContent, null, 2)}
          onChange={(e) => setStructuredContent(JSON.parse(e.target.value))}
          className="w-full p-2 border rounded h-60"
          placeholder="Content (JSON)"
          required
        />
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-60"
          placeholder="Content (Markdown supported)"
          required
        />
      )}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
}
