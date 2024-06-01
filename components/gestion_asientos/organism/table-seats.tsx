import { useState } from "react"
import { SeatIcon, SeatIconOff } from "../atom/seat"
import useGestionSeatStore from "../useGestionSeatStore"
import { Seat, UbicationSeatLabel } from "../utils/types"
import { changeSeatPassenger } from "../services/services"

// Class TOURIST - EXECUTIVE - FIRST_CLASS
// Ubications WINDOW - CENTER - AISLE

export enum ClassSeat {
  TOURIST = "TOURIST",
  EXECUTIVE = "EXECUTIVE",
  FIRST_CLASS = "FIRST_CLASS",
}

export const LabelClassSeat = {
  [ClassSeat.TOURIST]: "Turista",
  [ClassSeat.EXECUTIVE]: "Ejecutivo",
  [ClassSeat.FIRST_CLASS]: "Primera Clase",
}

export const colorClassSeat = {
  [ClassSeat.TOURIST]: "bg-blue-500/20 text-blue-500",
  [ClassSeat.EXECUTIVE]: "bg-green-500/20 text-green-500",
  [ClassSeat.FIRST_CLASS]: "bg-yellow-500/20 text-yellow-500",
}

interface SeatRowProps {
  seat: Seat
  selectSeat: (seat: Seat) => void
  seatSelected: Seat | undefined
}

interface TableSeatsProps {
  listSeats: Seat[]
  closeModal: () => void
  indexPassanger: number
}

const SeatRow = ({ seat, selectSeat, seatSelected }: SeatRowProps) => {
  const color = colorClassSeat[seat.seatClass]
  return (
    <div
      onClick={() => {
        if (seat.seatStatus !== "AVAILABLE") return
        selectSeat(seat)
      }}
      className={`${
        seat.id === seatSelected?.id && seat.seatStatus === "AVAILABLE"
          ? "bg-blue-300/60 outline outline-1 outline-offset-4 outline-gray-200"
          : ""
      } grid w-full grid-cols-5 items-center gap-8 rounded-md py-2 transition-all hover:bg-gray-300/40 hover:outline hover:outline-1 hover:outline-offset-4 hover:outline-gray-200`}
    >
      <div className="flex justify-center">{seat.seatStatus === "AVAILABLE" ? <SeatIcon /> : <SeatIconOff />}</div>
      <div>{seat.tag}</div>
      <div>{UbicationSeatLabel[seat.seatLocation]}</div>
      <div className={`rounded-full py-1 text-center text-xs font-semibold ${color}`}>
        {LabelClassSeat[seat.seatClass]}
      </div>
      <div>$ {seat.surcharge}</div>
    </div>
  )
}

const TableSeats = ({ indexPassanger, listSeats, closeModal }: TableSeatsProps) => {
  const [seatSelected, setSeatSelected] = useState<Seat>()
  const { actions } = useGestionSeatStore()

  const changeSeat = () => {
    console.log(seatSelected)
    if (seatSelected) {
      changeSeatPassenger(indexPassanger, seatSelected.id).then((response) => {
        if (response.status) {
          actions.updateSeatPassanger(indexPassanger, seatSelected)
          alert("Se ha cambiado el asiento correctamente")
        } else {
          alert("Ha ocurrido un error al cambiar el asiento")
        }
      })
    }
    closeModal()
  }

  return (
    <section className="mt-8 text-left text-gray-800">
      <div className="mb-4 grid w-full grid-cols-5 gap-8 text-sm font-semibold">
        <div>Disponibilidad</div>
        <div>Silla</div>
        <div>Ubicación</div>
        <div>Clase</div>
        <div>Valor</div>
      </div>
      <div className="flex flex-col gap-3 text-sm font-medium">
        {listSeats.map((seat, index) => (
          <SeatRow key={index} seat={seat} selectSeat={setSeatSelected} seatSelected={seatSelected} />
        ))}
      </div>
      <section className="mt-6 flex justify-center gap-4">
        <button
          onClick={closeModal}
          className="flex w-fit items-center justify-center rounded-md bg-gray-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          Cancelar
        </button>
        <button
          onClick={() => changeSeat()}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-blue-800 hover:shadow-lg"
        >
          Seleccionar
        </button>
      </section>
    </section>
  )
}

export default TableSeats
