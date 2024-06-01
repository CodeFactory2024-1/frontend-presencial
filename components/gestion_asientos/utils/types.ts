import { ClassSeat } from "../organism/table-seats"

export interface BookingInfo {
  id: number
  codename: string
  flightId: number
}

export interface PassengerInfo {
  id: number
  name: string
  bookingId: number
}

/*

"id": 61,
      "tag": "A-1",
      "seatStatus": "AVAILABLE",
      "seatClass": "FIRST_CLASS",
      "seatLocation": "WINDOW",
      "seatNumber": 1,
      "surcharge": 100000
*/

export interface Seat {
  id: number
  tag: string
  seatStatus: StateSeat
  seatClass: ClassSeat
  seatLocation: UbicationSeat
  seatNumber: number
  surcharge: number
}

export interface Passanger {
  index: number
  name: string
  seat: Seat | undefined
}

/* ----- ESTADO DEL ASIENTO ----- */

export enum StateSeat {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  OCCUPIED = "OCCUPIED",
}

export enum StateSeatLabel {
  AVAILABLE = "Disponible",
  BOOKED = "Reservado",
  OCCUPIED = "Ocupado",
}

/* ----- UBICACIÓN DEL ASIENTO ----- */

export enum UbicationSeat {
  WINDOW = "WINDOW",
  AISLE = "AISLE",
  CENTER = "CENTER",
}

export enum UbicationSeatLabel {
  WINDOW = "Ventana",
  AISLE = "Pasillo",
  CENTER = "Centro",
}
