const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.reading.deleteMany()
  await prisma.meter.deleteMany()
  await prisma.household.deleteMany()

  const h1 = await prisma.household.create({ data: { name: 'บ้านเลขที่ 1', address: 'หมู่ 1' } })
  const h2 = await prisma.household.create({ data: { name: 'บ้านเลขที่ 2', address: 'หมู่ 1' } })

  const m1 = await prisma.meter.create({ data: { serial: 'MTR-001', householdId: h1.id } })
  const m2 = await prisma.meter.create({ data: { serial: 'MTR-002', householdId: h2.id } })

  const now = new Date()
  await prisma.reading.createMany({ data: [
    { meterId: m1.id, timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2), volume: 12.5 },
    { meterId: m1.id, timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), volume: 15.2 },
    { meterId: m2.id, timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), volume: 9.8 },
  ]})

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
