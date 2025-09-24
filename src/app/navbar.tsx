'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/storeBook/store'

export default function Navbar() {
  // Redux store se booked workers count fetch karo
  const bookedCount = useSelector((state: RootState) => state.bookings.booked.length)

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Workers App</h1>
      <div className="flex gap-4 items-center">
        {/* <Link href="/workers" className="hover:text-gray-300">
          Workers
        </Link> */}
        <Link href="/booked" className="hover:text-gray-300 flex items-center gap-1">
          Booked Workers <span className="bg-red-600 px-2 py-0.5 rounded-full text-sm">{bookedCount}</span>
        </Link>
      </div>
    </nav>
  )
}
