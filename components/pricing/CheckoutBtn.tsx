"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import Loader from "../common/Loader";
import { useSubscriptionStore } from "@/store/store";
import ManageBilling from "./ManageBilling";

interface CheckoutBtnProps {
  className: string;
}

export default function CheckoutBtn({ className }: CheckoutBtnProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isActive = subscription?.status === "active";

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // push document into firestore db
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1PaydVE30s1CtC2EUFoC1tcF",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // ...stripe extension on firebase will create a checkout session
    return onSnapshot(docRef, async (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        //Show an error to your customer and
        //inspect your Cloud Function logs in the Firebase console
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        //We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
        setLoading(false);
      }
    });

    // redirect user to checkout page
  };

  return isActive ? (
    <ManageBilling />
  ) : (
    <Button
      id="pro"
      aria-describedby="pro"
      onClick={createCheckoutSession}
      className={className}
    >
      <div className="flex justify-center item-center">
        {loading ? <Loader /> : "Subscribe now"}
      </div>
    </Button>
  );
}
