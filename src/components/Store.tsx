import React, { useState, useContext } from "react";
import { data, Outlet, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, StarHalf, Check, ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import GenreFilter from "./GenreFilter";
import GameItem from "./GameItem";
import { GenreContext, GamesContext, Game } from "../App";
import { useScrollLock } from "./Hooks";

const Store = () => {
  // Game Overlay
  const [overlay, setOverlay] = useState<null | number>(null);

  // Games
  const { games, isLoading } = useContext(GamesContext);

  // Filters
  const [searchParams] = useSearchParams();
  const { genres, setGenres } = useContext(GenreContext);
  const [filterGenres, setFilterGenres] = useState(false);
  const [showGenre, setShowGenre] = useState(true);
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const scrollLock = useScrollLock();

  if (searchParams.size > 0) {
    console.log(searchParams.get("q"));
  }

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

  const handleGameClicked = (id: number) => {
    scrollLock(true);
    setOverlay(id);
  };

  const handleCloseOverlay = () => {
    scrollLock(false);
    setOverlay(null);
  };

  return (
    <>
      {overlay != null && (
        <div className="fixed z-1 flex h-full w-full justify-center bg-black/80 py-24" onClick={handleCloseOverlay}>
          <GameOverlay games={games} overlay={overlay} />
        </div>
      )}
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
                <p className="cursor-pointer text-slate-400 underline hover:text-slate-200" onClick={handleClearStars}>
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
          <div className="grid grow-1 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] content-start justify-items-stretch gap-4 p-12">
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
                {games?.map((game: Game, i: number) => {
                  const rating: number = game.rating ? parseInt(game.rating) : 0;
                  const genre: string = game.genres[0] ? game.genres[0].name : "unkown";

                  // filters to hide game if the filter criteria are not met
                  if (rating < stars) return null;
                  if (filterGenres && !genres[genre]) return null;
                  if (searchParams.has("q")) {
                    const query: string = searchParams.get("q") ?? "";
                    const regex = new RegExp(query, "i");
                    if (!regex.test(game.name)) return null;
                  }

                  return (
                    <GameItem
                      handleClick={handleGameClicked}
                      key={game.id}
                      id={i}
                      title={game.name}
                      image={game.background_image}
                      rating={game.rating}
                      genre={genre}
                    />
                  );
                })}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const GameOverlay = ({ games, overlay }: { games: Game[] | undefined; overlay: number }) => {
  const game = games?.[overlay];
  const [activeImage, setActiveImage] = useState<number>(0);
  const screenshots = games?.[overlay].screenshots ?? [];

  const handleIncrementImage = (increment: number) => {
    const newActiveImage = activeImage + increment;
    if (newActiveImage >= screenshots.length) setActiveImage(0);
    else if (newActiveImage < 0) setActiveImage(screenshots.length - 1);
    else setActiveImage(newActiveImage);
  };

  return (
    <div
      className="left-1/2 flex h-fit w-full max-w-3xl flex-col gap-4 overflow-clip rounded-4xl bg-slate-900"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative aspect-[16/9] h-fit w-full overflow-auto">
        <div className="absolute inset-y-0 left-0 z-1 flex w-10 cursor-pointer items-center" onClick={() => handleIncrementImage(-1)}>
          <ChevronLeft />
        </div>
        <div className="absolute inset-y-0 right-0 z-1 flex w-10 cursor-pointer items-center" onClick={() => handleIncrementImage(+1)}>
          <ChevronRight />
        </div>
        <div className="flex-rows absolute bottom-2 z-1 flex w-full justify-center gap-1.5 self-center">
          {games?.[overlay].screenshots.map((_, i) => {
            return (
              <div
                key={i}
                className={`${i == activeImage && "active"} h-2 w-2 cursor-pointer rounded-full bg-white/60 [.active]:bg-white`}
                onClick={() => setActiveImage(i)}
              />
            );
          })}
        </div>
        {games?.[overlay].screenshots.map((val, i) => {
          const image = val.image_url;
          return (
            <div
              key={i}
              className={`${i == activeImage && "active"} absolute aspect-[16/9] w-full bg-slate-950 bg-cover not-[.active]:hidden`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          );
        })}
      </div>
      <div className="mb-4 w-full px-8 py-2">
        <h2 className="text-4xl font-bold">{game?.name}</h2>
        <div className="mt-2 flex flex-row gap-4">
          <p className="text-lg text-slate-200">{game?.genres[0]?.name ?? "Unkown"}</p>
          <p className="text-lg text-slate-200">
            <span className="text-base text-slate-400">Rating:</span> {game?.rating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Store;
