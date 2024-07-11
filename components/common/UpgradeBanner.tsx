"use client";

import { useSubscriptionStore } from "@/store/store";

export default function UpgradeBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isActive = subscription?.status === "active";

  if (subscription === undefined || isActive) return null;

  return (
    <div className="flex items-center gap-x-6 bg-indigo-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <p className="text-md leading-6 text-white font-medium">
        Upgrade to Pro to unlock all features!
      </p>
      <div className="flex flex-1 justify-end"></div>
    </div>
  );
}
