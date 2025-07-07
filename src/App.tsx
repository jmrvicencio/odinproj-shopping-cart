import { useState } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import "./App.css";

function App() {
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");

  return (
    <>
      <Header page={page} />
      <div className="flex w-full grow-1 flex-row">
        <section className="w-56 border-r-1 border-slate-800 p-6">
          <h2 className="text-xl font-semibold">Genre</h2>
        </section>
        <section className="flex grow-1 justify-stretch">
          <Outlet />
        </section>
      </div>
    </>
  );
}

export default App;
