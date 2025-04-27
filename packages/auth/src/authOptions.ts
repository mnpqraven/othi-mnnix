import { env } from "@repo/env";
import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  pages: {
    signIn: "/whoami",
  },
  providers: [
    GithubProvider({
      clientId: env.OAUTH_OTHI_GITHUB_ID,
      clientSecret: env.OAUTH_OTHI_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.access_token = account.access_token;
      return token;
    },
    async session({ session, token }) {
      // TODO:
      // @ts-ignore
      if (session.user) session.user.access_token = token.access_token;
      return session;
    },
  },
};
