export interface PersonAPI {
  personId?: string
  identificationType: string
  id_number: string
  firstName: string
  lastName: string
  genre?: string
  birthDate?: string
  phoneNumber: string
  country?: string
  province?: string
  city?: string
  mail: string
  password?: string
}

export interface Person {
  personId: string
  identificationType: string
  id_number: string
  firstName: string
  lastName: string
  genre: string
  birthDate: string
  phoneNumber: string
  country: string
  province: string
  city: string
  mail: string
  password: string
  contactName: string
  contactLastname: string
  contactPhone: string
}
