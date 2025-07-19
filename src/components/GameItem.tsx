import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Minus, Star } from "lucide-react";
import { CartContext } from "../App";
import AmtStepper from "./AmtStepper";

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

  const handleAmtClicked = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleIncrement = (amt: number) => {
    const newAmt = Math.max(Math.min(currAmt + amt, 99), 0);
    const newCartItems = { ...cartItems, [id]: newAmt };
    if (newAmt == 0) delete newCartItems[id];

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
        <div className="absolute top-2 right-0">
          <AmtStepper
            amt={currAmt}
            active={isAdded}
            handleIncrement={handleIncrement}
            handleInput={handleInput}
            handleKeyDown={handleKeyDown}
            handleAmtClicked={handleAmtClicked}
          />
        </div>
      </div>
    </div>
  );
};

export default GameItem;
