import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { comparePassword } from "@/lib/password-utils";
import { getUserByEmail, noPasswordUser } from "@/lib/db";

const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        try {
          const user = await getUserByEmail(email);
          if (!user) {
            return null;
          }
          if (
            user.authProvider === "email" &&
            comparePassword(password, user?.password! || "")
          ) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
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
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
