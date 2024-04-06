'use server'

import { desc, eq } from "drizzle-orm"
import db from "./drizzle"
import { players } from "./schema"

export async function addPlayer(name: string) {
	await db.insert(players).values({
		name
	})
}

export async function getPlayers() {
	return await db.select().from(players)
		.orderBy(desc(players.level), desc(players.name))
}

export async function updatePlayers() {
	const playersToUpdate = await getPlayers()

	playersToUpdate.forEach(async (player) => {
		const updatePlayerData = await fetch("https://era.raider.io/api/crawler/characters", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				character: player.name,
				realm: "Crusader Strike",
				realmId: 2759,
				region: "us",
			})
		})

		const returnJson = await updatePlayerData.json()

		console.log(returnJson)

		const data = await fetch(`https://era.raider.io/api/v1/characters/profile?region=us&realm=crusader-strike&name=${player.name}&fields=gear%2Ctalents%2Cguild`)

		const json = await data.json()

		await db.update(players).set({
			level: json.level,
			profileUrl: json.profile_url,
			thumbnailUrl: json.thumbnail_url,
			profileBanner: json.profile_banner
		}).where(eq(players.id, player.id))
	})

}
