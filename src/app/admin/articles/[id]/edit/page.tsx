"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Article = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
};

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`/api/admin/articles/${id}`, {
        credentials: "include",
      });
      if (res.ok) {
        const article: Article = await res.json();
        setTitle(article.title);
        setContent(article.content);
        setPublished(article.published);
      } else {
        alert("Failed to load article");
        router.push("/admin/articles");
      }
      setFetchLoading(false);
    }
    fetchArticle();
  }, [id, router]);

  async function handleSubmit() {
    if (!title || !content) return;

    setLoading(true);

    const res = await fetch(`/api/admin/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        published,
      }),
      credentials: "include",
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin/articles");
    } else {
      alert("Failed to update article");
    }
  }

  if (fetchLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">Edit Article</h1>

      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Article content"
          rows={10}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="published"
          checked={published}
          onCheckedChange={setPublished}
        />
        <Label htmlFor="published">Published</Label>
      </div>

      <div className="flex space-x-4">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/admin/articles")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}