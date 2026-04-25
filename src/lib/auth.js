import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User, Inquiry } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
    await connectToDb();
    const user = await User.findOne({ username: credentials.username }).select("+password");

    if (!user) {
      throw new Error("Wrong credentials!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong credentials!");
    }

    // Sync previous guest inquiries with the same email to this user
    try {
      await Inquiry.updateMany(
        { email: user.email, userId: null },
        { userId: user._id }
      );
      console.log("✓ Synchronized guest inquiries for user:", user.username);
    } catch (syncErr) {
      console.warn("Could not sync inquiries on login:", syncErr);
    }

    // Update last login
    try {
      await user.updateLastLogin();
    } catch (err) {
      console.warn("Could not update last login:", err);
    }

    return user;
  } catch (error) {
    console.error("❌ Login error:", error);
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.error("❌ Credentials error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user._id?.toString() || user.id;
        token.isAdmin = user.isAdmin;
        token.username = user.username;
      }
      
      if (account) {
        token.provider = account.provider;
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        session.user.username = token.username;
        session.user.provider = token.provider;
      }
      return session;
    },
    ...authConfig.callbacks,
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
});
