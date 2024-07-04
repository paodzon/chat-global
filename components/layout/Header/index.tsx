import React from 'react'
import { ModeToggle } from './DarkModeToggle'
import UserButton from './UserButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { MessageSquareIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className='border-b'>
      <nav className='flex flex-col items-center justify-between p-4 gap-2 md:flex-row '>
        <div>
          <h1 className='text-3xl font-bold '>
            PolyChat
          </h1>
        </div>
        <div className='flex gap-4 items-center'>
          {/* Landuage Select */}

          {/* Session */}
          {session ? <>
            <Link href={'/chat'} prefetch={false}>
              <MessageSquareIcon className='text-black dark:text-white' />
            </Link>
          </> :
            <Link href="/pricing" >
              Pricing
            </Link>}

          <ModeToggle/>
          <UserButton session={session}/>
        </div>
      </nav>

      {/* Upgrade Banner */}

    </header>
  )
}
