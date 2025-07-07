import { data, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, Circle } from "lucide-react";
import GameItem from "./GameItem";

const Store = () => {
  const { page } = useParams();
  const { data: games, isLoading } = useQuery({
    queryKey: ["games", { page }],
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const res = await fetch("https://jsonfakery.com/games/paginated", { mode: "cors" });
      return await res.json();
    },
  });

  console.log(games?.data);

  return (
    <>
      <div className="grid grow-1 grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] justify-items-stretch gap-4 p-12">
        {isLoading ? (
          <>
            {Array.from({ length: 20 }, (_, i) => (
              <div className="flex animate-pulse flex-col gap-2 pb-4">
                <div className="aspect-16/9 w-full rounded-2xl bg-slate-600" />
                <div className="h-4 w-3/4 rounded-full bg-slate-600" />
                <div className="h-3 w-1/3 rounded-full bg-slate-600" />
              </div>
            ))}
          </>
        ) : (
          <>
            {games?.data.map((game: { name: string; background_image: string; genres: Array<{ name: string }>; id: string }) => (
              <GameItem key={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Store;
