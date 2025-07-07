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
      <Outlet />
    </>
  );
}

export default App;
