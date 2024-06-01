import { ChevronLeftIcon, ChevronRightIcon, UserIcon } from "@heroicons/react/24/solid"
import { colorClassSeat, LabelClassSeat } from "./table-seats"
import { SeatIcon } from "../atom/seat"
import useGestionSeatStore from "../useGestionSeatStore"
import { Seat } from "../utils/types"

interface RowSummaryProps {
  indexPassanger: number
  seat: Seat | undefined
  namePassanger: string
}

interface SummaryProps {
  closeModal: () => void
}

const RowSummary = ({ namePassanger, seat, indexPassanger }: RowSummaryProps) => {
  if (!seat)
    return (
      <li className="grid grid-cols-4 items-center ">
        <section className="flex items-center gap-2">
          <div className="w-fit rounded-md bg-gray-600/20 p-2 text-gray-600">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className=" font-semibold text-gray-700">
            <p className="-mb-1">{namePassanger}</p>
            <span className=" text-sm font-normal">Pasajero {indexPassanger}</span>
          </div>
        </section>
        <div className="flex items-center gap-2 font-semibold text-gray-500">
          <SeatIcon />
          Sin asiento
        </div>
        <div
          className={`h-fit w-fit rounded-full bg-gray-600/20 px-6 py-1 text-center text-xs font-semibold text-gray-600`}
        >
          Sin asiento
        </div>
        <span className="text-xl font-bold text-gray-600">$ 0</span>
      </li>
    )

  const color = colorClassSeat[seat.seatClass]

  return (
    <li className="grid grid-cols-4 items-center ">
      <section className="flex items-center gap-2">
        <div className="w-fit rounded-md bg-gray-600/20 p-2 text-gray-600">
          <UserIcon className="h-6 w-6" />
        </div>
        <div className=" font-semibold text-gray-700">
          <p className="-mb-1">{namePassanger}</p>
          <span className=" text-sm font-normal">Pasajero {indexPassanger}</span>
        </div>
      </section>
      <div className="flex items-center gap-2 font-semibold text-gray-500">
        <SeatIcon />
        {seat.tag}
      </div>
      <div className={`h-fit w-fit rounded-full px-6 py-1 text-center text-xs font-semibold ${color}`}>
        {LabelClassSeat[seat.seatClass]}
      </div>
      <span className="text-xl font-bold text-gray-600">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(seat.surcharge)}
      </span>
    </li>
  )
}

const Summary = ({ closeModal }: SummaryProps) => {
  const { totalPay, listPassanger } = useGestionSeatStore()
  return (
    <section className="mx-auto w-[50%] min-w-[300px] rounded-md bg-white p-8 shadow-md">
      <h3 className="text-center text-xl font-bold text-blue-500">Resumen de la selección</h3>
      <ul className="mt-8 flex flex-col gap-0">
        {listPassanger.map((passanger, _) => (
          <div key={passanger.index} className="border border-l-0 border-r-0 border-dotted border-gray-500 py-4">
            <RowSummary indexPassanger={passanger.index} namePassanger={passanger.name} seat={passanger.seat} />
          </div>
        ))}
      </ul>
      <section className="gap- my-4 flex flex-col text-right font-semibold text-gray-700">
        Monto total:
        <span className="text-2xl">
          {new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(totalPay)}
        </span>
      </section>
      <section className="mt-2 flex justify-center gap-4">
        <button
          onClick={closeModal}
          className="flex w-fit items-center justify-center rounded-md bg-gray-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-gray-800 hover:shadow-lg"
        >
          <ChevronLeftIcon className="h-6 w-6" />
          Volver
        </button>
        <button
          onClick={closeModal}
          className="flex w-fit items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-blue-800 hover:shadow-lg"
        >
          Continuar
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </section>
    </section>
  )
}

export default Summary
