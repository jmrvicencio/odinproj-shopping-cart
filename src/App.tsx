import { useState } from "react";
import { Outlet, Link, useMatches } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "./components/Header";
import "./App.css";

function App() {
  const matches = useMatches();
  const page = matches[1].pathname.replace("/", "");

  return (
    <>
      <Header page={page} />
      <h1>This is the home page</h1>
      <Outlet />
    </>
  );
}

export default App;
