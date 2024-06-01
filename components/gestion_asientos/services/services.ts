import { http, RequestResponse } from "../utils/http"
import { AxiosError } from "axios"
import { BookingInfo, Passanger, PassengerInfo, Seat } from "../utils/types"

export const getBookingInfo = async (bookingId: string): Promise<RequestResponse<BookingInfo>> => {
  try {
    const response = await http.get(`booking/${bookingId}`)
    const { data } = response
    const booking = data.body as BookingInfo
    return { data: booking, status: true }
  } catch (e) {
    const error = e as AxiosError
    const errorMessage = error.response?.data.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
    return { data: errorMessage, status: false }
  }
}

export const getPassengerList = async (fligthId: number): Promise<RequestResponse<Passanger[]>> => {
  try {
    const response = await http.get(`booking/${fligthId}/passenger/items`)
    const { data } = response
    const passengerList: Passanger[] = data.body.map((passenger: PassengerInfo) => {
      const newPassenger: Passanger = {
        index: passenger.id,
        name: passenger.name,
        seat: undefined,
      }
      return newPassenger
    })
    return { data: passengerList, status: true }
  } catch (e) {
    const error = e as AxiosError
    const errorMessage = error.response?.data.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
    return { data: errorMessage, status: false }
  }
}

export const getSeatList = async (fligthId: number): Promise<RequestResponse<Seat[]>> => {
  try {
    const response = await http.get(`seats/getAllBy/flight/${fligthId}`)
    const { data } = response
    const seatList = data.body as Seat[]
    return { data: seatList, status: true }
  } catch (e) {
    const error = e as AxiosError
    const errorMessage = error.response?.data.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
    return { data: errorMessage, status: false }
  }
}

export const changeSeatPassenger = async (
  passengerId: number,
  seatId: number
): Promise<
  RequestResponse<{
    seatId: number
    passengerId: number
  }>
> => {
  try {
    const response = await http.put(`/seats/change/${seatId}/passenger/${passengerId}`)
    const { data } = response
    const updateSeat = data.body
    return { data: updateSeat, status: true }
  } catch (e) {
    const error = e as AxiosError
    const errorMessage = error.response?.data.message || "Ha ocurrido un error inesperado. Por favor, intenta de nuevo."
    return { data: errorMessage, status: false }
  }
}
