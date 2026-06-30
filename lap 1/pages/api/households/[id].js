import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { id } = req.query
  try {
    if (req.method === 'GET') {
      const h = await prisma.household.findUnique({
        where: { id: Number(id) },
        include: { meters: true },
      })
      if (!h) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(h)
    }

    if (req.method === 'PUT') {
      const { name, address } = req.body
      const updated = await prisma.household.update({
        where: { id: Number(id) },
        data: { name, address },
      })
      return res.status(200).json(updated)
    }

    if (req.method === 'DELETE') {
      await prisma.household.delete({ where: { id: Number(id) } })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
