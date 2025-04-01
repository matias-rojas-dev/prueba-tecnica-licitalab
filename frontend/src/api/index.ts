import axios from 'axios'
import { IOpportunity } from '../interfaces/opportunity.interface'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/opportunities',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const API_ENDPOINTS = {
  GET_ALL_OPPORTUNITIES: () => '/',
  GET_FOLLOWED_OPPORTUNITIES: () => '/followed',
  UPDATE_FOLLOWED_OPPORTUNITY: (id: number) => `/${id}`,
}

export const getAllOpportunities = async (): Promise<IOpportunity[]> => {
  try {
    const { data } = await apiClient.get<IOpportunity[]>(
      API_ENDPOINTS.GET_ALL_OPPORTUNITIES()
    )
    return data
  } catch (error) {
    console.error('Error inesperado:', error)
    return []
  }
}

export const getFollowedOpportunities = async (): Promise<IOpportunity[]> => {
  try {
    const { data } = await apiClient.get<IOpportunity[]>(
      API_ENDPOINTS.GET_FOLLOWED_OPPORTUNITIES()
    )
    return data
  } catch (error) {
    console.error('Error inesperado:', error)
    return []
  }
}

export const updateFollowedOpportunity = async (
  id: number
): Promise<IOpportunity[]> => {
  try {
    const { data } = await apiClient.patch<IOpportunity[]>(
      API_ENDPOINTS.UPDATE_FOLLOWED_OPPORTUNITY(id)
    )
    return data
  } catch (error) {
    console.error('Error inesperado:', error)
    return []
  }
}
