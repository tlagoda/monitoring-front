import { URLs } from '@/config/config'
import axios from 'axios'
import type { PerformanceFilter } from '@/types/performances/types'

export class PerformanceService {
  static async getAll(perfFilter: PerformanceFilter) {
    try {
      const response = await axios.get(`${URLs.BACK_URL}/performance/filters`)
      return response
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async createPerformance() {}
}
