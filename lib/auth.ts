import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db, tables } from "@/lib/db";
import { eq } from "drizzle-orm";
import { oid } from "@/lib/utils";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      return true;
    },
    async session({ session, token }) {
      //@ts-ignore
      if (token) session.user = token.user;
      return session;
    },
    async jwt({ token, user: signInUser }) {
      const email = signInUser?.email || token.email;
      let user: any =
        email &&
        (
          await db
            .select()
            .from(tables.users)
            .where(eq(tables.users.email, email))
        )[0];

      if (!user && signInUser && email) {
        user = {
          id: oid(),
          email,
          name: signInUser.name || "Your name",
        };

        user = (await db.insert(tables.users).values(user).returning())[0];
      }

      if (!user) throw new Error("invalid user");

      token.user = {
        //@ts-ignore
        ...token.user,
        ...user,
        image: token.picture || signInUser?.image,
      };

      return token;
    },
  },
};
