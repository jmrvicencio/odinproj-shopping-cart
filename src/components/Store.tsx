import { data, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
      <div className="sm: grid grow-1 grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] justify-items-stretch gap-4 p-12">
        {games?.data.map((game: { name: string; background_image: string; genres: Array<{ name: string }>; id: string }) => (
          <GameItem key={game.id} title={game.name} image={game.background_image} genre={game.genres[0]?.name} />
        ))}
      </div>
    </>
  );
};

export default Store;
