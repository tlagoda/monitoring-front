import { URLs } from '@/config/config'
import axios from 'axios'
import type { PerformanceFilter, PerformanceCreate } from '@/types/performances/types'

export class PerformanceService {
  static async getAll() {
    try {
      const response = await axios.get(`${URLs.BACK_URL}/performance`)
      return {
        statusCode: response.status,
        data: response.data
      }
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async getFilteredPerformances(filters: PerformanceFilter) {
    try {
      const response = await axios.post(`${URLs.BACK_URL}/performance/filters`, filters)
      return {
        statusCode: response.status,
        data: response.data
      }
    } catch (err: any) {
      throw err.response.data
    }
  }

  static async createPerformance(performance: PerformanceCreate) {
    try {
      const response = await axios.post(`${URLs.BACK_URL}/performance/`, performance)
      return {
        statusCode: response.status,
        data: response.data
      }
    } catch (err: any) {
      throw err.response.data
    }
  }
}
