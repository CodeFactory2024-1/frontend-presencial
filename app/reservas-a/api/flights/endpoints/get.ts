import api from "../../config/api"
import Flight from "../interface/flight"

export const getFlights = async (): Promise<Flight[]> => {
  const response = await api.get("v1/flight/flights")
  return response.data
}
