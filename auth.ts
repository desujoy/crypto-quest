import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, users } from "./db/schema";

declare module "next-auth" {
  interface User {
    id?: string;
    regno?: string;
    gameCompleted?: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  providers: [
    Google({
      profile(profile) {
        if (profile.email.endsWith("@vitbhopal.ac.in")) {
          return {
            id: profile.id,
            name: profile.given_name,
            email: profile.email,
            emailVerified: profile.email_verified,
            image: profile.picture,
            regno: profile.family_name,
          };
        } else {
          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            emailVerified: profile.email_verified,
            image: profile.picture,
            regno: "N/A",
          };
        }
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user = user;
      return session;
    },
  },
  pages: {
    error: "/auth",
  },
});
