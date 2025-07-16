import { useState, createContext } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import "./App.css";

type Genre = Record<string, boolean>;
export const GenreContext = createContext<{ genres: Genre; setGenres: (x: Genre) => void }>({
  genres: {},
  setGenres: () => {},
});

function App() {
  const [genres, setGenres] = useState<Genre>({});
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");

  return (
    <>
      <GenreContext value={{ genres, setGenres }}>
        <Header page={page} />
        <Outlet />
      </GenreContext>
    </>
  );
}

export default App;
