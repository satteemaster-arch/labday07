import { recipes } from "@/lib/data/recipes"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const result = category ? recipes.filter(r => r.category === category) : recipes
  return Response.json(result)
}

export async function POST(request) {
  const body = await request.json()

  if (!body.name) {                                             // ⚠️ validate ขั้นต่ำ
    return Response.json({ error: "ต้องมี name" }, { status: 400 })
  }

  const newRecipe = { id: Date.now(), category: "Other", ...body }
  recipes.push(newRecipe)
  return Response.json(newRecipe, { status: 201 })
}
