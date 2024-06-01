import { create } from "zustand"
import { BookingInfo, Passanger, Seat } from "./utils/types"

interface Store {
  booking: BookingInfo | undefined
  listPassanger: Passanger[]
  listSeats: Seat[]
  totalPay: number
  actions: {
    setListSeats: (newListSeats: Seat[]) => void
    setBookingInfo: (booking: BookingInfo) => void
    setListPassanger: (newListPassanger: Passanger[]) => void
    updateSeatPassanger: (indexPassanger: number, newSeat: Seat) => void
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
    updateSeatPassanger: (indexPassanger: number, newSeat: Seat) =>
      set((state) => {
        const newListPassanger = state.listPassanger.map((passanger) => {
          if (passanger.index === indexPassanger) {
            passanger.seat = newSeat
          }
          return passanger
        })
        const totalPay = newListPassanger.reduce((acc, passanger) => {
          if (!passanger.seat) return acc
          return acc + passanger.seat.surcharge
        }, 0)
        return { listPassanger: newListPassanger, totalPay }
      }),
  },
}))

export default useGestionSeatStore
