import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Settings } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session || !session.user?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex flex-col gap-4">
            <FileText className="w-8 h-8" />
            <h2 className="text-xl font-semibold">Articles</h2>
            <p className="text-sm text-gray-600">
              Create, edit and publish news articles
            </p>
            <Button className="mt-auto">Manage Articles</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex flex-col gap-4">
            <Users className="w-8 h-8" />
            <h2 className="text-xl font-semibold">Authors</h2>
            <p className="text-sm text-gray-600">
              Manage authors and contributors
            </p>
            <Button className="mt-auto" variant="secondary">
              View Authors
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="p-6 flex flex-col gap-4">
            <Settings className="w-8 h-8" />
            <h2 className="text-xl font-semibold">Settings</h2>
            <p className="text-sm text-gray-600">
              Configure site preferences
            </p>
            <Button className="mt-auto" variant="outline">
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
