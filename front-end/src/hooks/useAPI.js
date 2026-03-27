import { useState, useCallback } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

export const useAPI = (endpoint) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`)
      let items = []
      
      // Extrai dados da resposta estruturada da API
      if (response.data?.dados) {
        const dados = response.data.dados
        // Se existe 'pacientes', 'medicos', 'planos' ou 'consultas', usa aquele array
        if (Array.isArray(dados.pacientes)) {
          items = dados.pacientes
        } else if (Array.isArray(dados.medicos)) {
          items = dados.medicos
        } else if (Array.isArray(dados.planos)) {
          items = dados.planos
        } else if (Array.isArray(dados.consultas)) {
          items = dados.consultas
        } else if (Array.isArray(dados)) {
          items = dados
        }
      }
      
      setData(items)
    } catch (err) {
      const errorMsg = err.response?.data?.mensagem || err.message || 'Erro ao carregar dados'
      setError(errorMsg)
      console.error('Erro ao buscar dados:', err)
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  const createItem = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, formData)
      // Extrai item criado da resposta
      const newItem = response.data?.dados || response.data
      setData([...data, newItem])
      return newItem
    } catch (err) {
      const errorMsg = err.response?.data?.mensagem || err.message || 'Erro ao criar item'
      setError(errorMsg)
      throw err
    }
  }

  const updateItem = async (id, formData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}${endpoint}/${id}`, formData)
      // Extrai item atualizado da resposta
      const updatedItem = response.data?.dados || response.data
      setData(data.map(item => item.id === id ? updatedItem : item))
      return updatedItem
    } catch (err) {
      const errorMsg = err.response?.data?.mensagem || err.message || 'Erro ao atualizar item'
      setError(errorMsg)
      throw err
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}${endpoint}/${id}`)
      setData(data.filter(item => item.id !== id))
    } catch (err) {
      const errorMsg = err.response?.data?.mensagem || err.message || 'Erro ao deletar item'
      setError(errorMsg)
      throw err
    }
  }

  const clearError = () => setError(null)

  return { data, loading, error, fetchData, createItem, updateItem, deleteItem, clearError }
}
