import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        cnic: { label: "CNIC", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { cnic, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ cnic });

          if (!user) {
            throw new Error("No user found with the provided CNIC");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Incorrect password");
          }

          return user;
        } catch (error) {
          console.error("Error in authorization: ", error);
          throw new Error(error.message || "Internal server error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.cnic = user.cnic;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.cnic = token.cnic;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/login", 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
