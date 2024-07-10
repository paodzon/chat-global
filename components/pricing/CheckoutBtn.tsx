"use client";

import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

interface CheckoutBtnProps{
  className: string
}

export default function CheckoutBtn({className} : CheckoutBtnProps) {
  const {data: session} = useSession();

  const createCheckoutSession = () => {
    if(!session) return;

    // push document into firestore db

    // ...stripe extension on firebase will create a checkout session

    // redirect user to checkout page
  }

  return (
    <Button onClick={createCheckoutSession} className={className}>Manage billing</Button>
  )
}
