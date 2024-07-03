import React from 'react'
import { ModeToggle } from './DarkModeToggle'
import UserButton from './UserButton'

export default function Header() {
  return (
    <header className='border-b'>
      <nav className='flex flex-col items-center justify-between p-4 gap-2 md:flex-row '>
        <div>
          <h1 className='text-3xl font-bold '>
            PolyChat
          </h1>
        </div>
        <div className='flex gap-4'>
          {/* Landuage Select */}

          {/* Session */}

          <ModeToggle/>
          <UserButton/>
        </div>
      </nav>

      {/* Upgrade Banner */}

    </header>
  )
}
