// src/components/navbar.tsx
import { auth, signIn, signOut } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Log out</button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Sign in</button>
        </form>
      )}
    </nav>
  );
}
