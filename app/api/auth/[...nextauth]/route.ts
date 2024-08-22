import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import {
  getUserByEmail,
  noPasswordUser,
  updateUserAuthToken,
} from "@/lib/queries";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import { checkTokenExpiration, generateSecureString } from "@/lib/auth-utils";
import { User } from "@/stores/user-store";

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
          image: user.image!,
          authToken: generateSecureString(),
          authProvider: (account?.provider! as string) || "oauth",
        };
        await noPasswordUser(data);
      } else {
        if (checkTokenExpiration(existingUser.authExpiresAt!)) {
          const data = {
            authToken: generateSecureString(),
          };
          updateUserAuthToken(existingUser.id!, data.authToken);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await getUserByEmail(user.email!);
        if (existingUser) {
          token.user = existingUser as User;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  ...authConfig,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
