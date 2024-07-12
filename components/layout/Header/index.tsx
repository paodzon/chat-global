import React from 'react'
import { ModeToggle } from './DarkModeToggle'
import UserButton from './UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { MessageSquareIcon } from 'lucide-react'
import Link from 'next/link'
import CreateChatButton from './CreateChatButton'
import UpgradeBanner from '@/components/common/UpgradeBanner'
import LanguageSelect from './LanguageSelect'

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className='border-b z-10'>
      <nav className='flex flex-col items-center justify-between p-4 gap-2 md:flex-row '>
        <div>
          <Link href="/" className='text-3xl font-bold '>
            PolyChat
          </Link>
        </div>
        <div className='flex gap-4 items-center'>
          {/* Landuage Select */}
          <LanguageSelect/>
          {/* Session */}
          {session ? <>
            <Link href={'/chat'} prefetch={false}>
              <MessageSquareIcon className='text-black dark:text-white' />
            </Link>
            <CreateChatButton />
          </> :
            <Link href="/pricing" >
              Pricing
            </Link>}

          <ModeToggle />
          <UserButton session={session} />
        </div>
      </nav>

      {/* Upgrade Banner */}
      <UpgradeBanner/>
    </header>
  )
}
