import { useState, createContext } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import "./App.css";

type Genre = Record<string, boolean>;
type Item = Record<number, number>;

export const GenreContext = createContext<{ genres: Genre; setGenres: (x: Genre) => void }>({
  genres: {},
  setGenres: () => {},
});

export const CartContext = createContext<{ cartItems: Item; setCartItems: (x: Item) => void }>({
  cartItems: {},
  setCartItems: () => {},
});

function App() {
  const [genres, setGenres] = useState<Genre>({});
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");

  return (
    <>
      <CartContext value={{ cartItems, setCartItems }}>
        <GenreContext value={{ genres, setGenres }}>
          <Header page={page} />
          <Outlet />
        </GenreContext>
      </CartContext>
    </>
  );
}

export default App;
