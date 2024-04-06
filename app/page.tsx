import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPlayers } from "@/db/actions";
import Link from "next/link";

function validPlayer(player: Awaited<ReturnType<typeof getPlayers>>[0]) {
  if (!player.profileUrl || !player.thumbnailUrl || !player.profileBanner) {
    return false
  }

  return true
}

export default async function Home() {
  const players = await getPlayers()

  const validPlayers = players.filter((player) => validPlayer(player))

  return (
    <main className="flex flex-col mt-6">
      <div className="flex flex-col text-center space-y-1">
        <h1 className="text-4xl text-center">
          <span className="text-orange-500">WoW</span>{" "}
          <span className="text-blue-500">King</span>
        </h1>
        <p className="text-secondary-foreground text-sm">The race to 50... for all honor!</p>
      </div>

      <form method="POST" action="/api/players/add">
        <input
          type="text"
          name="name"
          placeholder="Character name"
          className="mt-4 p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="mt-4 bg-blue-500 text-white rounded-md p-2">
          Add
        </button>
      </form>

      <form method="POST" action="/api/players/update">
        <button type="submit" className="mt-4 bg-blue-500 text-white rounded-md p-2">
          Update
        </button>
      </form>

      <div>{players.length} players</div>

      <div className="mt-16 container mx-auto">
        <div className="flex flex-col space-y-4">
          {validPlayers.map((player) => (
            <Card key={player.name} className="w-full" style={{
              backgroundImage: `url(https://cdn-era.raiderio.net/images/profile/masthead_backdrops/v2/${player.profileBanner}.jpg)`,
            }}>
              <CardHeader className="flex flex-row space-x-2">
                <Avatar>
                  <AvatarImage src={player.thumbnailUrl} alt={player.name} />
                  <AvatarFallback>{player.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                  <CardTitle>
                    <Link href={player.profileUrl}>
                      {player.name}
                    </Link>
                  </CardTitle>
                  <CardDescription>Current level - {player.level}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={
                  (Math.min(player.level, 50) / 50) * 100
                } />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
