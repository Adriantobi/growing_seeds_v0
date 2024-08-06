import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { getUserByEmail, noPasswordUser } from "@/lib/db";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserByEmail(user.email!);

      if (!existingUser) {
        const data = {
          name: user.name!,
          email: user.email!,
          authProvider: (account?.provider! as string) || "oauth",
        };
        await noPasswordUser(data);
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
