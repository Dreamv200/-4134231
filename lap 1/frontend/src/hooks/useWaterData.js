'use client'

import { useState, useEffect } from 'react'
import { fetchWaterData } from '@/lib/api-client'

export const useWaterData = (householdId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!householdId) return

    const loadData = async () => {
      try {
        setLoading(true)
        const result = await fetchWaterData(householdId)
        setData(result)
        setError(null)
      } catch (err) {
        setError(err.message)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [householdId])

  return { data, loading, error }
}

export default useWaterData
