// Database configuration helper
// ใช้งานร่วมกับ Backend API

export const dbConfig = {
  // Database endpoints
  endpoints: {
    households: '/api/households',
    meters: '/api/meters',
    readings: '/api/readings',
  },

  // Query helpers
  buildWaterQuery: (householdId, startDate, endDate) => {
    const params = new URLSearchParams()
    if (householdId) params.append('householdId', householdId)
    if (startDate) params.append('start', startDate)
    if (endDate) params.append('end', endDate)
    return params.toString()
  },
}

export default dbConfig
