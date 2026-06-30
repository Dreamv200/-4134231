import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { householdId, start, end } = req.query
      const where = {}
      if (householdId) {
        where.meter = { householdId: Number(householdId) }
      }
      if (start || end) {
        where.timestamp = {}
        if (start) where.timestamp.gte = new Date(start)
        if (end) where.timestamp.lte = new Date(end)
      }

      const readings = await prisma.reading.findMany({
        where,
        include: { meter: true },
        orderBy: { timestamp: 'desc' },
      })
      return res.status(200).json(readings)
    }

    if (req.method === 'POST') {
      const { meterId, timestamp, volume } = req.body
      if (!meterId || volume == null) return res.status(400).json({ error: 'meterId and volume are required' })
      const r = await prisma.reading.create({
        data: { meterId: Number(meterId), timestamp: timestamp ? new Date(timestamp) : undefined, volume: Number(volume) },
      })
      return res.status(201).json(r)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
