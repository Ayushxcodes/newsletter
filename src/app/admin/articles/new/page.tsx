"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NewArticlePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!title || !content) return;

    setLoading(true);

    const res = await fetch("/api/admin/articles", {
      method: "POST",
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
      alert("Failed to save article");
    }
  }

  return (
    <div className="max-w-3xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">New Article</h1>

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
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={published}
          onCheckedChange={setPublished}
        />
        <Label>Publish immediately</Label>
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Article"}
      </Button>
    </div>
  );
}
