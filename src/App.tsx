import { useState } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import "./App.css";

function App() {
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");
  console.log(page);

  return (
    <>
      <header className="flex w-full items-center p-8 font-mono">
        <h1 className="text-4xl font-black">
          GameCache<span className="text-orange-400">+</span>
        </h1>
        <nav className="flex gap-4 px-12 text-xl text-slate-400">
          <Link
            {...(page == "home" && { "data-active": "" })}
            className="border-b-1 border-white/0 p-4 hover:border-slate-700 data-[active]:border-slate-600 data-[active]:text-slate-200"
            to="home"
          >
            Home
          </Link>
          <Link
            {...(page == "store" && { "data-active": "" })}
            className="border-b-1 border-white/0 p-4 hover:border-slate-700 data-[active]:border-slate-600 data-[active]:text-slate-200"
            to="store"
          >
            Store
          </Link>
        </nav>
        <input type="text" className="font-sans" />
      </header>
      <h1>This is the home page</h1>
      <Outlet />
    </>
  );
}

export default App;
