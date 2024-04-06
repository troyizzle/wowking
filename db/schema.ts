import { integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const players = pgTable("players", {
	id: serial("id").primaryKey(),
	name: text("title").notNull().unique(),
	profileBanner: text("profile_banner"),
	thumbnailUrl: text("thumbnail_url"),
	profileUrl: text("profile_url"),
	level: integer("level"),
})
