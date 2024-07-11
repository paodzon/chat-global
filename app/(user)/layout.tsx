import React from 'react'

interface ChatsLayoutProps {
  children: React.ReactNode
}

export default function ChatsLayout({children} : ChatsLayoutProps) {
  return (
    <div className="flex-1 w-full flex flex-col max-w-6xl mx-auto">
      {children}
    </div>
  )
}
