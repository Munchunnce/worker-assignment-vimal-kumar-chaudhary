'use client'

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/storeBook/store";
import { cancelBooking, clearAll } from "@/storeBook/bookingsSlice";
import { useState } from "react";

export default function BookedWorkersPage() {
  const bookedWorkers = useSelector((state: RootState) => state.bookings.booked);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleBookNow = (id: number) => {
    dispatch(cancelBooking(id)); // remove from booked list
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // popup 2 sec ke liye show
  }

  if (bookedWorkers.length === 0 && !showPopup) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No workers booked yet.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 bg-gray-50 relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg animate-bounce">
          Booking Successful!
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Booked Workers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookedWorkers.map(worker => (
            <div key={worker.id} className="bg-white p-4 border rounded-lg shadow flex flex-col">
              <img
                src={worker.image || '/images/placeholder.png'}
                alt={worker.name}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2">{worker.name}</h2>
              <p className="text-gray-600">{worker.service}</p>
              <p className="mt-1 font-medium">₹{Math.round(worker.pricePerDay * 1.18)} / day</p>

              {/* Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => dispatch(cancelBooking(worker.id))}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => handleBookNow(worker.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {bookedWorkers.length > 0 && (
          <div className="mt-8 text-center">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
              onClick={() => dispatch(clearAll())}
            >
              Clear All Bookings
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
