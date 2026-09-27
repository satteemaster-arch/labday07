export async function GET() {
  const price = (Math.random() * 100 + 900).toFixed(2)
  return Response.json({ symbol: "DEMO", price })
}
