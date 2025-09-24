// bookingsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Worker {
  id: number;
  name: string;
  service: string;
  pricePerDay: number;
  image: string;
}

interface BookingState {
  booked: Worker[];
}

const initialState: BookingState = {
  booked: [],
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    bookWorker: (state, action: PayloadAction<Worker>) => {
      const alreadyBooked = state.booked.find(w => w.id === action.payload.id);
      if (!alreadyBooked) {
        state.booked.push(action.payload);
      }
    },
    cancelBooking: (state, action: PayloadAction<number>) => {
      state.booked = state.booked.filter(w => w.id !== action.payload);
    },
    clearAll: (state) => {
      state.booked = [];
    },
  },
});

export const { bookWorker, cancelBooking, clearAll } = bookingsSlice.actions;
export default bookingsSlice.reducer;
