import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, users } from "./db/schema";

declare module "next-auth" {
  interface User {
    id?: string;
    regno?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  session: { strategy: "jwt" },
  providers: [
    Google({
      profile(profile) {
        console.log(profile);
        return {
          id: profile.id,
          name: profile.given_name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          regno: profile.family_name,
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    signIn({ profile }) {
      return profile?.email?.endsWith("@vitbhopal.ac.in") || false;
    },
    jwt({ token, user }) {
      if (user) {
        token.regno = user.regno;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.regno = token.regno as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    error: "/auth",
  },
});
