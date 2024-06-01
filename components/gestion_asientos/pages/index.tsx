import { useEffect, useState } from "react"
import MountPay from "../atom/mount"
import Header from "../molecule/header"
import PassengerList from "../organism/passanger-list"
import { getBookingInfo } from "../services/services"
import { BookingInfo } from "../utils/types"
import useFetching from "../hooks/useStateFetch"
import useGestionSeatStore from "../useGestionSeatStore"

interface Props {
  reserva: string
}

const GestionAsientosPage = ({ reserva }: Props) => {
  const [booking, setBooking] = useState<BookingInfo>()
  const { isLoading, error, setError, setIsLoading } = useFetching()
  const { actions } = useGestionSeatStore()

  const getBooking = async () => {
    setIsLoading(true)
    const response = await getBookingInfo(reserva)
    if (response.status) {
      setBooking(response.data as BookingInfo)
      setIsLoading(false)
      actions.setBookingInfo(response.data as BookingInfo)
      return
    }
    setError(response.data as string)
  }

  useEffect(() => {
    getBooking()
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">Cargando...</h1>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h1 className="text-4xl font-bold">{error}</h1>
      </main>
    )
  }

  return (
    <main className="relative grid min-h-screen">
      <div className="mx-auto w-[90%] py-4 md:w-[70%]">
        <div className="flex items-center justify-between">
          <Header reserva={reserva} />
          <MountPay />
        </div>
        <PassengerList />
      </div>
    </main>
  )
}

export default GestionAsientosPage
