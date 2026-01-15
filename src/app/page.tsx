import TestPage from "@/components/supa";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>My News Platform</h1>
      <TestPage />

      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>

          <nav style={{ marginTop: "1rem" }}>
            <Link href="/admin">Go to Admin</Link>
          </nav>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <a href="/api/auth/signin">Sign in</a>
          
        </>
        
      )}
    </main>
  );
}
