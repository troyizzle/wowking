import { addPlayer } from "@/db/actions"

export async function POST(request: Request) {
	const formData = await request.formData()

	const name = formData.get("name")

	if (!name) {
		return Response.json({ error: "name is required" }, { status: 400 })
	}


	await addPlayer(name.toString())

	return Response.json({ success: true })
}
