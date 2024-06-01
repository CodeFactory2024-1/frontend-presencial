import { useEffect, useState } from "react"
import { SeatIcon, SeatIconOff } from "../atom/seat"
import TableSeats from "./table-seats"
import { Seat } from "../utils/types"
import { getSeatList } from "../services/services"
import useGestionSeatStore from "../useGestionSeatStore"
import useFetching from "../hooks/useStateFetch"

interface SelectSeat {
  closeModal: () => void
  namePassanger: string
  indexPassanger: number
}

const SelectSeat = ({ closeModal, namePassanger, indexPassanger }: SelectSeat) => {
  const [listSeats, setListSeats] = useState<Seat[]>([])
  const { booking } = useGestionSeatStore()
  const { error, isLoading, setError, setIsLoading } = useFetching()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (!booking) {
        setError("No se ha encontrado la reserva")
        return
      }
      const response = await getSeatList(booking.flightId)
      if (response.status) {
        setListSeats(response.data as Seat[])
        setIsLoading(false)
        return
      }
      setError(response.data as string)
    })()
  }, [])
  return (
    <section className="mx-auto w-[70%] min-w-[300px] rounded-md bg-white p-8 shadow-md">
      <header className="flex flex-col gap-1">
        <div className="font-semibold text-gray-500">
          <h5>{namePassanger}</h5>
          <p className="text-xs font-medium">Pasajero {indexPassanger}</p>
        </div>
        <h4 className="text-center text-lg font-semibold text-blue-600">Selecciona tu asiento</h4>
        <div className="flex items-center justify-center gap-2">
          <span className="font bold flex items-center gap-2 text-center text-sm text-gray-600">
            <SeatIcon />
            Disponible
          </span>
          <div className="h-[20px] w-[1px] bg-gray-600"></div>
          <span className="font bold flex items-center gap-2 text-center text-sm text-gray-600">
            Ocupado
            <SeatIconOff />
          </span>
        </div>
      </header>
      {isLoading ? (
        <h1 className="text-2xl font-bold text-gray-600">Cargando...</h1>
      ) : error ? (
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
      ) : listSeats.length === 0 ? (
        <h1 className="text-2xl font-bold text-gray-600">No se han encontrado asientos</h1>
      ) : (
        <TableSeats indexPassanger={indexPassanger} listSeats={listSeats} closeModal={closeModal} />
      )}
    </section>
  )
}

export default SelectSeat
