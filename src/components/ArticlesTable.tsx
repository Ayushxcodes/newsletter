"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Article = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string | null;
};

interface ArticlesTableProps {
  articles: Article[];
}

export default function ArticlesTable({ articles }: ArticlesTableProps) {
  const router = useRouter();

  async function handleDelete(id: string) {
    toast("Are you sure you want to delete this article?", {
      action: {
        label: "Delete",
        onClick: async () => {
          const res = await fetch(`/api/admin/articles/${id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (res.ok) {
            router.refresh();
            toast.success("Article deleted successfully");
          } else {
            toast.error("Failed to delete article");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  }

  return (
    <div className="rounded-xl border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>
                {article.published ? (
                  <Badge>Published</Badge>
                ) : (
                  <Badge variant="secondary">Draft</Badge>
                )}
              </TableCell>
              <TableCell>
                {article.created_at ? new Date(article.created_at).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/admin/articles/${article.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}