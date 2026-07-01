export async function GET() {
  return Response.json({
    status: 'Normal',
    pressure: '72 psi',
    flowRate: '120 L/min',
  });
}
