export async function GET() {
  return Response.json([
    { id: 1, event: 'Water pressure stabilized', time: '09:10' },
    { id: 2, event: 'Maintenance crew dispatched', time: '11:25' },
  ]);
}
