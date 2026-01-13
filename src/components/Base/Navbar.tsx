import { auth, signIn, signOut } from "@/lib/auth";
import Link from "next/link";
import { Home, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left side - Logo / Home */}
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          NewsPortal
        </Link>
        {session && (
          <Link href="/admin" className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100">
            <Home className="w-4 h-4" /> Admin
          </Link>
        )}
      </div>

      {/* Right side - Auth / Profile Buttons */}
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span className="text-sm font-medium">{session.user?.email}</span>
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button variant="destructive" className="flex items-center gap-1">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </form>
          </>
        ) : (
          <form
            action={async () => {
              'use server';
              await signIn('google');
            }}
          >
            <Button variant="default" className="flex items-center gap-1">
              <User className="w-4 h-4" /> Sign in
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
}
