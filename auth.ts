import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminAuth, adminDb } from "./firebase-admin";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            (credentials as any).email || '',
            (credentials as any).password || ''
          );
          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              email: userCredential.user.email,
              name: userCredential.user.email,
              image: ''
            };
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;

          try {
            const firebaseToken = await adminAuth.createCustomToken(token.sub);
            session.firebaseToken = firebaseToken;
          } catch (error) {
            console.error("Error creating custom token:", error);
          }
        }
      }
      return session;
    },
    async jwt({ user, token }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt"
  },
  adapter: FirestoreAdapter(adminDb),
  pages: {
    signIn: '/signin'
  }
} satisfies NextAuthOptions;

export default authOptions;
