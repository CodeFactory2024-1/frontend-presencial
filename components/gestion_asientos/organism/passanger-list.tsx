import { UsersIcon } from "@heroicons/react/24/solid"
import PassengerCell from "../molecule/passenger-cell"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import useGestionSeatStore from "../useGestionSeatStore"
import useModal from "../molecule/modal/useModal"
import Modal from "../molecule/modal/modal"
import Summary from "./summary"
import useFetching from "../hooks/useStateFetch"
import { useEffect } from "react"
import { getPassengerList } from "../services/services"
import { Passanger } from "../utils/types"

const PassengerList = () => {
  const { booking, listPassanger } = useGestionSeatStore()
  const { actions } = useGestionSeatStore()
  const { error, isLoading, setError, setIsLoading } = useFetching()
  const { isOpen, closeModal, openModal } = useModal()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (!booking) {
        setError("No se ha encontrado la reserva")
        return
      }
      const response = await getPassengerList(booking.flightId)
      if (response.status) {
        actions.setListPassanger(response.data as Passanger[])
        setIsLoading(false)
        return
      }
      setError(response.data as string)
    })()
  }, [])

  return (
    <>
      <section className="my-8">
        <header className="flex w-full items-center justify-between border-b-[1px] border-blue-200 pb-4 text-2xl font-semibold text-gray-700">
          <h4>Listado de pasajeros</h4>
          <div className="flex gap-1 text-[90%] text-gray-500">
            <UsersIcon className="h-8 w-8" />
            <span>{listPassanger.length}</span>
          </div>
        </header>
        <section className="my-4 flex flex-col gap-4">
          {isLoading ? (
            <h1 className="text-2xl font-bold text-gray-600">Cargando...</h1>
          ) : error ? (
            <h1 className="text-2xl font-bold text-red-600">{error}</h1>
          ) : listPassanger.length === 0 ? (
            <h1 className="text-2xl font-bold text-gray-600">No se han encontrado pasajeros</h1>
          ) : (
            listPassanger.map((passanger) => <PassengerCell key={passanger.index} passanger={passanger} />)
          )}
        </section>
        <section className="mt-8 flex justify-end gap-4">
          <button className="flex w-fit items-center justify-center rounded-md bg-gray-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-gray-800 hover:shadow-lg">
            <ChevronLeftIcon className="h-6 w-6" />
            Volver
          </button>
          <button
            onClick={openModal}
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-sm font-bold uppercase text-white transition-all hover:bg-blue-800 hover:shadow-lg"
          >
            Continuar
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </section>
      </section>
      {isOpen && (
        <Modal closeModal={closeModal}>
          <Summary closeModal={closeModal} />
        </Modal>
      )}
    </>
  )
}

export default PassengerList
