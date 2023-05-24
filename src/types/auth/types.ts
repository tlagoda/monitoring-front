export type Credentials = {
  email: string
  password: string
}

export type NewUser = {
  username: string
  email: string
  password: string
  gender: 'M' | 'F' | null
}
