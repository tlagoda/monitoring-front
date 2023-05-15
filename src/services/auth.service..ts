import { URLs } from '@/config/config'
import type { Credentials, NewUser } from '@/types/auth/types'
import axios from 'axios'

export class AuthService {
  static async signup(newUser: NewUser) {
    try {
      const response = await axios.post(`${URLs.BACK_URL}/auth/signup`, newUser)
      return response.data
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async login(credentials: Credentials) {
    try {
      const response = await axios.post(`${URLs.BACK_URL}/auth/login`, credentials)
      return response.data
    } catch (err: any) {
      throw err.response.data
    }
  }
}