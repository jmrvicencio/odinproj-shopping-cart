import { data, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf, Check, ChevronDown, ChevronUp } from "lucide-react";
import GameItem from "./GameItem";
import React, { useState } from "react";

const Store = () => {
  const { page } = useParams();
  const [genreFilter, setGenresFilter] = useState<Record<number, boolean>>({ 0: false });
  const [genres, setGenres] = useState([]);
  const [showGenre, setShowGenre] = useState(true);
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);

  const { data: games, isLoading } = useQuery({
    queryKey: ["games"],
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const res = await fetch("https://jsonfakery.com/games/random/50", { mode: "cors", signal });
      const data = await res.json();
      return data;
    },
  });

  const handleRatingMouseMove = (e: React.MouseEvent, index: number) => {
    const item = e.currentTarget.getBoundingClientRect();
    const mouse = e.pageX;
    const third = mouse - item.x > item.width * 0.33;
    const two = mouse - item.x > item.width * 0.66;
    const currStar = third ? (two ? 1 : 0.5) : 0;
    setHoverStars(index + currStar);
  };

  const handleShowGenres = () => {
    setShowGenre(!showGenre);
  };

  const handleRatingLeave = (e: React.MouseEvent) => {
    setHoverStars(stars);
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    setStars(hoverStars);
  };

  const handleGenres = (e: React.MouseEvent, id: number) => {
    console.log(genreFilter);
    setGenresFilter({ ...genreFilter, [id]: !genreFilter[id] });
  };

  return (
    <>
      <div className="flex w-full grow-1 flex-row">
        <section className="flex w-72 flex-col gap-6 border-r-1 border-slate-800 p-6">
          <div className="flex flex-col gap-1">
            <div className="flex w-full cursor-pointer flex-row items-end justify-between pb-2" onClick={handleShowGenres}>
              <h2 className="text-lg font-bold">Genre</h2>
              {showGenre ? <ChevronDown /> : <ChevronUp />}
            </div>
            <div
              onClick={(e) => handleGenres(e, 0)}
              className="flex w-full cursor-pointer flex-row items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800"
            >
              <div className="flex flex-row">
                <input type="checkbox" className="peer hidden" onChange={() => {}} checked={genreFilter[0]} />
                <div className="group h-4.25 w-4.25 rounded-sm border-1 border-slate-600 peer-checked:bg-slate-300">
                  {genreFilter[0] && <Check className="h-full w-full stroke-slate-900 peer-checked:hidden" />}
                </div>
              </div>
              <p>Horror</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold">Rating</h2>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row" onMouseLeave={handleRatingLeave} onClick={handleRatingClick}>
                <div className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, 0)}>
                  {hoverStars == 0.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  {hoverStars >= 1 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                </div>
                <div className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, 1)}>
                  {hoverStars == 1.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  {hoverStars >= 2 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                </div>
                <div className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, 2)}>
                  {hoverStars == 2.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  {hoverStars >= 3 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                </div>
                <div className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, 3)}>
                  {hoverStars == 3.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  {hoverStars >= 4 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                </div>
                <div className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, 4)}>
                  {hoverStars == 4.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  {hoverStars >= 5 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                  <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                </div>
              </div>
              <p className="text-slate-400"> {stars == 0 ? "any" : stars}</p>
            </div>
          </div>
        </section>
        <section className="flex grow-1 justify-stretch">
          <div className="grid grow-1 grid-cols-[repeat(auto-fit,_minmax(230px,1fr))] justify-items-stretch gap-4 p-12">
            {isLoading ? (
              <>
                {Array.from({ length: 20 }, (_, i) => (
                  <div className="flex animate-pulse flex-col gap-2 pb-4" key={i}>
                    <div className="aspect-16/9 w-full rounded-2xl bg-slate-600" />
                    <div className="h-4 w-3/4 rounded-full bg-slate-600" />
                    <div className="h-3 w-1/3 rounded-full bg-slate-600" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {games?.map(
                  (
                    game: { name: string; background_image: string; rating: string; genres: Array<{ name: string }>; id: string },
                    i: number,
                  ) => {
                    const rating: number = game.rating ? parseInt(game.rating) : 0;
                    if (rating < stars) return null;
                    return (
                      <GameItem
                        key={game.id}
                        id={i}
                        title={game.name}
                        image={game.background_image}
                        rating={game.rating}
                        genre={game.genres[0]?.name}
                      />
                    );
                  },
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Store;
