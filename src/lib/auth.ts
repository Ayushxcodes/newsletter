import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google],
  callbacks: {
    session({ session }) {
      if (session.user) {
        session.user.isAdmin =
          session.user.email === "krish989pandey@gmail.com";
      }
      return session;
    },
  },
});
