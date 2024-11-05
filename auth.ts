import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { accounts, users } from "./db/schema";
import { authUserToNameRegno } from "./utils/string-man";

declare module "next-auth" {
  interface User {
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
        return {
          id: profile.id,
          name: authUserToNameRegno(profile.name).userName,
          email: profile.email,
          image: profile.picture,
          regno: authUserToNameRegno(profile.name).userRegNo,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.regno = user.regno;
      return token;
    },
    session({ session, token }) {
      session.user.regno = token.regno as string;
      return session;
    },
  },
});
