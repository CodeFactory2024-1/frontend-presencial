import { create } from "zustand"
import { BookingInfo, Passanger, Seat } from "./utils/types"

// Se empieza a hacer la integración con el backend

interface Store {
  booking: BookingInfo | undefined
  listPassanger: Passanger[]
  listSeats: Seat[]
  totalPay: number
  actions: {
    setListSeats: (newListSeats: Seat[]) => void
    setBookingInfo: (booking: BookingInfo) => void
    setListPassanger: (newListPassanger: Passanger[]) => void
  }
}

const useGestionSeatStore = create<Store>((set) => ({
  booking: undefined,
  listPassanger: [],
  totalPay: 0,
  listSeats: [],
  actions: {
    setListPassanger: (newListPassanger: Passanger[]) => set({ listPassanger: newListPassanger }),
    setBookingInfo: (booking: BookingInfo) => set({ booking }),
    setListSeats: (newListSeats: Seat[]) => set({ listSeats: newListSeats }),
  },
}))

export default useGestionSeatStore
