"use client"
export default function AddRecipeForm() {
  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "สูตรใหม่" })
    })
    const created = await res.json()
    console.log(created)
  }
  return <button onClick={handleSubmit}>เพิ่มสูตรอาหาร</button>
}
