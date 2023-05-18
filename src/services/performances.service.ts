import { URLs } from '@/config/config'
import axios from 'axios'
import type { PerformanceFilter } from '@/types/performances/types'

export class PerformanceService {
  static async getAll() {
    // A TESTER
    try {
      const response = await axios.get(`${URLs.BACK_URL}/performance`)
      return response
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async getFilteredPerformances(filters: PerformanceFilter) {
    // A TESTER
    try {
      const response = await axios.get(`${URLs.BACK_URL}/performance/filters`, { data: filters })
      return response
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async createPerformance() {}
}
