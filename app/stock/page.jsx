export default async function StockPage() {
  const res = await fetch("http://localhost:3000/api/stock", { cache: "no-store" })   // ✓
  const { symbol, price } = await res.json()
  return <p>{symbol}: ${price}</p>
}
