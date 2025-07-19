import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { Search, ShoppingCart, X } from "lucide-react";
import { CartContext } from "../App";

const Header = ({ page }: { page: string }) => {
  const [search, setSearch] = useState("");
  const { cartItems } = useContext(CartContext);
  const cartLength = Object.keys(cartItems).length;
  const searchInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const handleStartSearch = (e: React.KeyboardEvent) => {
    if (e.key == "Escape") searchInput.current?.blur();
    if (e.key == "Enter") {
      const inputVal = searchInput.current?.value ?? "";
      if (inputVal === "") return;

      searchInput.current?.blur();
      navigate({
        pathname: "/store",
        search: createSearchParams({ q: inputVal }).toString(),
      });
    }
  };

  return (
    <header className="flex w-full items-center border-b-1 border-slate-800 p-8 font-mono">
      <h1 className="text-4xl font-black">
        GameCache<span className="text-orange-400">+</span>
      </h1>
      <nav className="flex gap-4 px-12 text-xl text-slate-400">
        <Link
          {...(page == "home" && { "data-active": "" })}
          className="border-b-1 border-white/0 p-4 hover:border-slate-700 data-[active]:border-orange-400 data-[active]:text-slate-200"
          to="home"
        >
          Home
        </Link>
        <Link
          {...(page == "store" && { "data-active": "" })}
          className="border-b-1 border-white/0 p-4 hover:border-slate-700 data-[active]:border-orange-400 data-[active]:text-slate-200"
          to="store"
        >
          Store
        </Link>
      </nav>
      <div className="flex grow-1 justify-end gap-4">
        <div className="relative">
          <input
            ref={searchInput}
            type="text"
            className={`${search == "" ? "" : "searching"} peer w-64 rounded-full border-1 border-slate-600 px-12 py-2 font-sans outline-slate-400 transition-[width] duration-300 ease-in-out placeholder:text-slate-500 focus:w-88 focus:outline-1 [.searching]:w-88`}
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            onKeyDown={handleStartSearch}
          />
          <Search className="absolute top-1/2 left-4 w-6 -translate-y-1/2 stroke-slate-600" />
          <X
            className="absolute top-1/2 right-4 w-6 -translate-y-1/2 cursor-pointer stroke-slate-400 not-peer-[.searching]:not-peer-focus:hidden"
            onClick={handleClearSearch}
          />
        </div>
        <Link to="cart">
          <div
            className={`${cartLength > 0 && "cart-items"} group cart transition-gap relative flex h-10 cursor-pointer items-center gap-0 rounded-full border-1 border-slate-600 px-4 duration-300 ease-in-out [.cart-items]:gap-2`}
          >
            <div className="flex w-0 justify-center transition-all duration-300 ease-in-out group-[.cart-items]:w-4">
              <p className="text-slate-400 not-group-[.cart-items]:hidden group-[.cart:hover]:text-slate-200">{cartLength}</p>
            </div>
            <div className="relative">
              <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-400 not-group-[.cart-items]:hidden" />
              <ShoppingCart className="w-6 stroke-slate-400 stroke-1 group-hover:stroke-slate-200" />
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
