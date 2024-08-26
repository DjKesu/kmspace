'use client';

import { useState } from 'react';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug, content }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setTitle('');
        setSlug('');
        setContent('');
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
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-60"
        placeholder="Content (Markdown supported)"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Post
      </button>
    </form>
  );
}