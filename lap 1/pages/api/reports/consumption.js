import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    const { householdId, start, end } = req.query
    if (!householdId) return res.status(400).json({ error: 'householdId is required' })

    const where = {
      meter: { householdId: Number(householdId) },
    }
    if (start || end) {
      where.timestamp = {}
      if (start) where.timestamp.gte = new Date(start)
      if (end) where.timestamp.lte = new Date(end)
    }

    const total = await prisma.reading.aggregate({
      where,
      _sum: { volume: true },
    })

    return res.status(200).json({ householdId: Number(householdId), totalVolume: total._sum.volume || 0 })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
