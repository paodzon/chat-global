
import { NextAuthOptions } from "next-auth"
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
        return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '').then((userCredential) => {
          if (userCredential.user) {
            return {
              id: userCredential.user?.uid,
              email: userCredential.user?.email,
              name: userCredential.user?.email,
              image: ''
            }
          }
          return null;
        }).catch((error) => console.error(error));
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token.sub) {
          session.user.id = token.sub;

          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt'
  },
  adapter: FirestoreAdapter(adminDb),
  debug: true,
  pages: {
    signIn: '/signin'
  }
} satisfies NextAuthOptions
