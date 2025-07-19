import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Star } from "lucide-react";
import { CartContext } from "../App";

const GameItem = ({
  title,
  image,
  genre,
  rating,
  id,
  handleClick,
}: {
  title: string;
  image: string;
  genre: string;
  rating: string;
  id: number;
  handleClick: (id: number) => void;
}) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const currAmt = cartItems[id] ?? 0;
  const [amt, setAmt] = useState(0);
  const isAdded = cartItems[id] != null ? true : false;
  const amtField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleGameClicked = () => {
    console.log("game clicked");
    console.log(id);
    navigate(`${id}`);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmt: string = e.target.value;
    const newCartItems: Record<number, number> = { ...cartItems };

    if (newAmt == "") {
      newCartItems[id] = 0;
    } else if (/^\d+$/.test(newAmt)) {
      const currInt = parseInt(newAmt);

      if (currInt >= 100) {
        newCartItems[id] = 99;
      } else {
        newCartItems[id] = currInt;
      }
    }

    setCartItems(newCartItems);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      const inputAmt = amtField.current ? amtField.current.value : "0";

      amtField.current?.blur();
      if (parseInt(inputAmt) == 0) {
        const newCartItems = { ...cartItems };
        delete newCartItems[id];
        setCartItems(newCartItems);
      }
    }
  };

  const handleAmtClicked = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleAdd = () => {
    const newAmt = currAmt + 1;
    const newCartItems = { ...cartItems, [id]: newAmt };
    setCartItems(newCartItems);
  };

  const handleSubtract = () => {
    const newAmt = currAmt - 1;
    const newCartItems = { ...cartItems, [id]: newAmt };
    if (newAmt == 0) {
      delete newCartItems[id];
    }
    setCartItems(newCartItems);
  };

  const bgStyle = {
    backgroundImage: `url('${image}')`,
  };
  const bgShine = {
    background:
      "linear-gradient(12deg,rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.25) 57%, rgba(255, 255, 255, 0.24) 60%, rgba(255, 255, 255, 0.14) 100%)",
  };

  return (
    <div className="group item relative h-fit cursor-pointer" onClick={() => handleClick(id)}>
      <div
        className="group transition-scale aspect-16/9 w-full scale-100 overflow-hidden rounded-2xl bg-slate-800 bg-cover duration-200 ease-in-out group-hover:scale-104"
        style={bgStyle}
      >
        <div
          className="relative inset-0 -top-1/4 h-full transition-all duration-300 ease-in-out group-[.item:hover]:top-0"
          style={bgShine}
        />
      </div>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <div className="relative flex flex-row justify-between pb-4">
        <div className="flex flex-col">
          <p className="font-semibold text-slate-400 uppercase">{genre ? genre : "Unkown"}</p>
          <div className="flex flex-row items-center gap-1">
            <Star className="h-4 w-4 stroke-slate-400" />
            <p className="text-slate-400">{rating}</p>
          </div>
        </div>
        <div
          className={`group ${isAdded && "is-added"} absolute top-4 right-0 overflow-hidden rounded-full border-1 border-slate-500 px-1 opacity-0 transition-all duration-300 ease-in-out not-[.is-added]:border-orange-500 group-[.item:hover]:top-2 group-[.item:hover]:opacity-100 [.is-added]:top-2 [.is-added]:opacity-100`}
        >
          <div
            className={`flex min-h-6 ${isAdded ? "w-18" : "w-4"} items-center justify-end gap-1 transition-[width] duration-300 ease-in-out`}
            onClick={handleAmtClicked}
          >
            <Minus className={`${!isAdded && "hidden"} h-6 w-4 min-w-4 stroke-slate-200`} onClick={handleSubtract} />
            <input
              ref={amtField}
              type="text"
              className={`${!isAdded && "hidden"} w-8 items-center border-r-1 border-l-1 border-slate-500 text-center outline-none`}
              onChange={handleInput}
              value={currAmt}
              onKeyDown={handleKeyDown}
            />
            <Plus className="h-6 w-4 min-w-4 not-group-[.is-added]:stroke-orange-500" onClick={handleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameItem;
