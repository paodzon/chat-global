import { generatePortalLink } from '@/actions/generatePortalLink'
import React from 'react'

export default function ManageBilling() {
  return (
    <form action={generatePortalLink}>
      <button className='mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 dark:text-white dark:ring-indigo-600 w-full' type="submit">Manage Billing</button>
    </form>
  )
}
