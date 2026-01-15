"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, published }),
    });

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 space-y-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">New Article</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded h-64"
        required
      />
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        <span>Publish?</span>
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Save Article
      </button>
    </form>
  );
}
