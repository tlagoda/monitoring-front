export type PerformanceFilter = {
  internalId?: string
  userInternalId?: string
  date?: Date
  exercise?: string
  sets?: number
  repetitions?: number
  restTime?: number
  weight?: number
  totalWeight?: number
  muscles?: string[]
  comments?: string
}

export type PerformanceCreate = {
  date: string,
  userInternalId: string,
  exercise: string,
  sets: number,
  repetitions: number,
  restTime: number,
  weight: number,
  muscles?: string[],
  comments?: string
}
