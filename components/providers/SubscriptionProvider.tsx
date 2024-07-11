"use client";
import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface SubscriptionProviderProps {
  children: React.ReactNode
}

export default function SubscriptionProvider({children} : SubscriptionProviderProps) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if(!session) return;

    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if(snapshot.empty){
        console.log("User has no subscription");
        setSubscription(null);
        //set no subscription
        return;
      }else{
        console.log("User has subscription");
        
        setSubscription(snapshot.docs[0].data());
        //set Subscription
      }
    }, (error) => {
      console.log("Error getting document:", error);
    }
  )

  },[session])

  return (
    <>{children}</>
  )
}
