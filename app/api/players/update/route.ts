import { updatePlayers } from "@/db/actions"

export async function POST() {
	await updatePlayers()

	return Response.json({ success: true })
}
