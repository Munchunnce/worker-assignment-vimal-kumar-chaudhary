// 'use client'
// import { WorkerType } from '@/types/workers'
// import Image from 'next/image'
// import { useState, useEffect } from 'react'

// export default function WorkersPage() {
//   const [workersData, setWorkersData] = useState<WorkerType[]>([])

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await import('../../workers.json')
//         setWorkersData(response.default)
//       } catch (error) {
//         console.error('Failed to load workers:', error)
//       }
//     }
//     loadData()
//     loadData()
//   }, [])

//   return (
//     <main className='container mx-auto px-4 py-8 bg-[#000000]'>
//       <h1 className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>

//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
//         {workersData
//           .filter((worker) => worker.pricePerDay > 0)
//           .filter((worker) => worker.id !== null)
//           .sort((a, b) => a.name.localeCompare(b.name))
//           .map((worker: WorkerType) => (
//             <div
//               key={worker.id}
//               className='border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300'
//             >
//               <div className='w-full h-48 relative'>
//                 <Image
//                   src={worker.image}
//                   alt={worker.name}
//                   fill
//                   className='object-cover'
//                   priority={worker.id <= 10}
//                 />
//               </div>
//               <div className='p-4'>
//                 <h2 className='text-xl font-semibold'>{worker.name}</h2>
//                 <p className='text-gray-600'>{worker.service}</p>
//                 <p className='mt-2 font-medium'>
//                   ₹{Math.round(worker.pricePerDay * 1.18)} / day
//                 </p>
//               </div>
//             </div>
//           ))}
//       </div>
//     </main>
//   )
// }

'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import type { WorkerType } from '@/types/workers'
import { useDispatch } from 'react-redux'
import { bookWorker } from '@/storeBook/bookingsSlice'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // filters
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc');

  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true

    async function loadData() {
      try {
        const res = await fetch('/workers.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: WorkerType[] = await res.json()
        if (mounted) {
          setWorkersData(data)
          setLoading(false)
        }
      } catch (err) {
        console.error('Failed to load workers:', err)
        if (mounted) {
          setError('Failed to load workers data')
          setLoading(false)
        }
      }
    }

    loadData()
    return () => {
      mounted = false
    }
  }, [])

  // Apply filters + sorting
  const filteredWorkers = workersData
    .filter((worker) =>
      worker.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((worker) =>
      serviceFilter === 'all' ? true : worker.service === serviceFilter
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'price-asc':
          return a.pricePerDay - b.pricePerDay
        case 'price-desc':
          return b.pricePerDay - a.pricePerDay
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading workers...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Our Workers
        </h1>

        {/* Filters UI */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/3"
          />

          {/* Service Filter */}
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Services</option>
            <option value="Welder">Welder</option>
            <option value="Painter">Painter</option>
            <option value="Carpenter">Carpenter</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredWorkers.map((worker) => (
            <article
              key={worker.id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="w-full h-48 relative bg-gray-100">
                <Image
                  src={worker.image || '/images/placeholder.png'}
                  alt={worker.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900">
                  {worker.name}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{worker.service}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">
                    ₹{Math.round(worker.pricePerDay * 1.18)} / day
                  </p>
                  <button onClick={() => dispatch(bookWorker(worker))} className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
                    Book
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
