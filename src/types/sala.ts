type ISODateString = string

export type TheaterType = "2D" | "3D" | "IMAX"
export type TheaterStatus = "available" | "occupied" | "maintenance"
export type MovieRating = "G" | "PG" | "PG-13" | "R" | "NC-17"

export interface Theater {
  id: string
  name: string
  capacity: number
  type: TheaterType
  amenities: string[]
  status: TheaterStatus
  lastMaintenance: ISODateString
  nextMaintenance: ISODateString
}

export interface Movie {
  id: string
  title: string
  duration: number // in minutes
  genre: string
  rating: MovieRating
  posterUrl: string
}

export interface Screening {
  id: string
  movieId: string
  theaterId: string
  startTime: ISODateString
  endTime: ISODateString
  ticketsSold: number
}

export interface Maintenance {
  id: string
  theaterId: string
  scheduledDate: ISODateString
  description: string
}

