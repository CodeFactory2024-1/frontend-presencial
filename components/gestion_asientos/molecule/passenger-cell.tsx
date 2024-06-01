import { UserIcon } from "@heroicons/react/24/solid"
import Seat from "../atom/seat"
import SelectSeat from "../organism/select-seat"
import useModal from "./modal/useModal"
import Modal from "./modal/modal"
import { Passanger } from "../utils/types"

interface Props {
  passanger: Passanger
}

const PassengerCell = ({ passanger }: Props) => {
  const { isOpen, openModal, closeModal } = useModal()

  console.log("Imprimiendo --> ", passanger)

  return (
    <>
      <article className="flex w-full items-center justify-between rounded-md">
        <section className="flex items-center gap-2">
          <div className="w-fit rounded-md bg-gray-600/20 p-2 text-gray-600">
            <UserIcon className="h-6 w-6" />
          </div>
          <div className=" font-semibold text-gray-700">
            <p className="-mb-1">{passanger.name}</p>
            <span className=" text-sm font-normal">Pasajero {passanger.index}</span>
          </div>
        </section>
        <section className="flex items-center gap-4">
          <p className="text-xl font-bold text-gray-600">
            {passanger.seat ? `$ ${passanger.seat.surcharge}` : "Sin asignar"}
          </p>
          <Seat seat={passanger.seat?.tag || ""} />
          <button
            onClick={openModal}
            className="rounded-md bg-blue-500/30 px-4 py-2 font-semibold text-blue-500 transition-all hover:shadow-lg"
          >
            Seleccionar
          </button>
        </section>
      </article>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <SelectSeat namePassanger={passanger.name} indexPassanger={passanger.index} closeModal={closeModal} />
        </Modal>
      )}
    </>
  )
}

export default PassengerCell
