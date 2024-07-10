"use client";

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const syncFirebaseAuth = async (session: Session) => {
    if(session && session.firebaseToken){
      try{
        await signInWithCustomToken(auth, session.firebaseToken);
      }catch(err){
        console.error("Error signing in with custom token:", err)
      }
    }else{
      auth.signOut();
    }
}

interface FirebaseAuthProviderProps {
  children: React.ReactNode
}

export default function FirebaseAuthProvider({children} : FirebaseAuthProviderProps) {
  const {data: session} = useSession();

  useEffect(() => {
    if(!session) return;

    syncFirebaseAuth(session);
  }, [session])
  return <>{children}</>
}
