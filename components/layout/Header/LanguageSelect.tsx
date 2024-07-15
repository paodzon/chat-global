"use client"
import Loader from "@/components/common/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSelect() {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.status === "active";

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>
          <SelectContent>
            {subscription === undefined ? (
              <Loader />
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguagesSupportedMap[language]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href={"/pricing"} key={language} prefetch={false}>
                    <SelectItem
                      key={language}
                      value={language}
                      disabled
                      className="bg-gray-300/50 text-gray-500 dark:text-white py-2 my-1"
                    >
                      {LanguagesSupportedMap[language]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
}
