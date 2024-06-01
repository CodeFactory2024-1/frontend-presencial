import useGestionSeatStore from "../useGestionSeatStore"

const MountPay = () => {
  const { totalPay } = useGestionSeatStore()
  return (
    <div className="rounded-md bg-green-300/40 px-8 py-4 font-semibold text-gray-700 outline-dashed outline-1 outline-offset-2">
      <p>TOTAL A PAGAR</p>
      <strong className="text-2xl font-bold">
        {new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        }).format(totalPay)}{" "}
        COP
      </strong>
    </div>
  )
}

export default MountPay
