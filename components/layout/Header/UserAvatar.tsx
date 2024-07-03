import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";

interface UserAvatarProps {
  name: string,
  image?: string,
  className?: string
}

export default function UserAvatar({name, image, className} : UserAvatarProps) {
  return (
    <Avatar className={cn('bg-white text-black', className)}>
      {image && (
        <Image 
        src={image} 
        alt={name}
        width={40}
        height={40}
        className="rounded-full"
        />
      )
      }
      <AvatarFallback className="dark:bg-white dark:text-black text-lg">{name.split('')[0].toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}
