import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const households = await prisma.household.findMany({
        include: { meters: true },
      })
      return res.status(200).json(households)
    }

    if (req.method === 'POST') {
      const { name, address } = req.body
      if (!name) return res.status(400).json({ error: 'name is required' })
      const h = await prisma.household.create({ data: { name, address } })
      return res.status(201).json(h)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
