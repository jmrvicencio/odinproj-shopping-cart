import React, { useState, useContext } from "react";
import { data, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf, Check, ChevronDown, ChevronUp } from "lucide-react";
import GenreFilter from "./GenreFilter";
import GameItem from "./GameItem";
import { GenreContext } from "../App";

const Store = () => {
  const { page } = useParams();
  const { genres, setGenres } = useContext(GenreContext);
  const [filterGenres, setFilterGenres] = useState(false);
  const [showGenre, setShowGenre] = useState(true);
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);

  const { data: games, isLoading } = useQuery({
    queryKey: ["games"],
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const res = await fetch("https://jsonfakery.com/games/random/50", { mode: "cors", signal });
      const data = await res.json();
      const newGenres: Record<string, boolean> = {};

      data.forEach((item: { genres: Array<{ name: string }> }, i: number) => {
        const currGenre = item.genres[0] ? item.genres[0].name : "unkown";
        newGenres[currGenre] = false;
      });

      setGenres(newGenres);
      return data;
    },
  });

  const handleRatingMouseMove = (e: React.MouseEvent, index: number) => {
    const item = e.currentTarget.getBoundingClientRect();
    const mouse = e.pageX;

    // define areas for a third and two thirds of the length of a star
    const third = mouse - item.x > item.width * 0.33;
    const twoThirds = mouse - item.x > item.width * 0.66;

    // define the current rating we should assign based on the start we're hovering
    const currStar = third ? (twoThirds ? 1 : 0.5) : 0;

    setHoverStars(index + currStar);
    console.log(index + currStar);
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

  const handleGenres = (e: React.MouseEvent, genre: string) => {
    const newGenres = { ...genres, [genre]: !genres[genre] };
    setFilterGenres(
      Object.values(newGenres).some((val) => {
        return val == true;
      }),
    );
    setGenres(newGenres);
  };

  const handleClearGenres = (e: React.MouseEvent) => {
    e.stopPropagation();

    const newGenres = genres;
    Object.keys(newGenres).forEach((key) => (newGenres[key] = false));
    setGenres(newGenres);
    setFilterGenres(false);
  };

  const handleClearStars = (e: React.MouseEvent) => {
    e.stopPropagation();

    setStars(0);
    setHoverStars(0);
  };

  return (
    <>
      <div className="flex w-full grow-1 flex-row">
        <section className="flex w-72 flex-col gap-6 border-r-1 border-slate-800 p-6">
          <div className="flex flex-col gap-1">
            <div className="flex w-full cursor-pointer flex-row items-end justify-between pb-2" onClick={handleShowGenres}>
              <div className="flex flex-row items-end gap-2">
                <h2 className="text-lg font-bold">Genre</h2>
                {filterGenres && (
                  <p className="text-slate-400 underline hover:text-slate-200" onClick={handleClearGenres}>
                    clear
                  </p>
                )}
              </div>
              {showGenre ? <ChevronDown /> : <ChevronUp />}
            </div>
            {showGenre && <GenreFilter genres={genres} handleGenres={handleGenres} />}
          </div>
          <div className="flex flex-col gap-1 pb-2">
            <div className="flex flex-row items-end gap-2">
              <h2 className="text-lg font-bold">Rating</h2>
              {stars > 0 && (
                <p className="text-slate-400 underline hover:text-slate-200" onClick={handleClearStars}>
                  clear
                </p>
              )}
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row" onMouseLeave={handleRatingLeave} onClick={handleRatingClick}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="relative h-6 w-6" onMouseMove={(e) => handleRatingMouseMove(e, i)}>
                    {hoverStars == i + 0.5 && <StarHalf className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                    {hoverStars >= i + 1 && <Star className="relative z-1 h-full w-full fill-slate-200 stroke-none" />}
                    <Star className="absolute inset-0 z-0 h-full w-full fill-slate-600 stroke-none" />
                  </div>
                ))}
              </div>
              <p className="text-slate-400"> {stars == 0 ? "any" : stars}</p>
            </div>
          </div>
        </section>
        <section className="flex grow-1 justify-stretch">
          <div className="grid grow-1 grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] content-start justify-items-stretch gap-4 p-12">
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
                    const genre: string = game.genres[0] ? game.genres[0].name : "unkown";

                    // filters to hide game if the filter criteria are not met
                    if (rating < stars) return null;
                    if (filterGenres && !genres[genre]) return null;

                    return (
                      <GameItem key={game.id} id={i} title={game.name} image={game.background_image} rating={game.rating} genre={genre} />
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
