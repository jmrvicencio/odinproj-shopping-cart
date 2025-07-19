import { useState, createContext } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import "./App.css";

type Genre = Record<string, boolean>;
type Items = Record<number, number>;
export type Game = {
  name: string;
  background_image: string;
  rating: string;
  genres: { name: string }[];
  id: string;
  screenshots: { image_url: string }[];
};

export const GenreContext = createContext<{ genres: Genre; setGenres: (x: Genre) => void }>({
  genres: {},
  setGenres: () => {},
});

export const CartContext = createContext<{ cartItems: Items; setCartItems: (item: Items) => void }>({
  cartItems: {},
  setCartItems: () => {},
});

export const GamesContext = createContext<{ games: Game[] | undefined; isLoading: boolean }>({
  games: [],
  isLoading: false,
});

function App() {
  const [genres, setGenres] = useState<Genre>({});
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");

  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ["games"],
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const res = await fetch("https://jsonfakery.com/games/random/50", { mode: "cors", signal });
      const data: Game[] = await res.json();
      const newGenres: Record<string, boolean> = {};

      data.forEach((item: { genres: Array<{ name: string }> }, i: number) => {
        const currGenre = item.genres[0] ? item.genres[0].name : "unkown";
        newGenres[currGenre] = false;
      });

      setGenres(newGenres);
      return data;
    },
  });

  return (
    <>
      <GamesContext value={{ games, isLoading }}>
        <CartContext value={{ cartItems, setCartItems }}>
          <GenreContext value={{ genres, setGenres }}>
            <Header page={page} />
            <Outlet />
          </GenreContext>
        </CartContext>
      </GamesContext>
    </>
  );
}

export default App;
