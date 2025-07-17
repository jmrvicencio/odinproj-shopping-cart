import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, Star } from "lucide-react";

const GameItem = ({ title, image, genre, rating, id }: { title: string; image: string; genre: string; rating: string; id: number }) => {
  const [amt, setAmt] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const amtField = useRef<HTMLInputElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currAmt = e.target.value;

    if (currAmt == "") {
      setAmt(0);
    }
    if (/^\d+$/.test(currAmt)) {
      const currInt = parseInt(currAmt);

      if (currInt >= 100) {
        setAmt(99);
      } else {
        setAmt(parseInt(currAmt));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      const inputAmt = amtField.current ? amtField.current.value : "0";

      amtField.current?.blur();
      if (parseInt(inputAmt) == 0) setIsAdded(false);
    }
  };

  const handleAdd = () => {
    setAmt(amt + 1);
    setIsAdded(true);
  };

  const handleSubtract = () => {
    const currAmt = amt - 1;
    setAmt(currAmt);
    if (currAmt == 0) {
      setIsAdded(false);
    }
  };

  const bgStyle = {
    backgroundImage: `url('${image}')`,
  };
  const bgShine = {
    background:
      "linear-gradient(12deg,rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.25) 57%, rgba(255, 255, 255, 0.24) 60%, rgba(255, 255, 255, 0.14) 100%)",
  };

  return (
    <div className="group item relative h-fit cursor-pointer">
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
          >
            <Minus className={`${!isAdded && "hidden"} h-6 w-4 min-w-4 stroke-slate-200`} onClick={handleSubtract} />
            <input
              ref={amtField}
              type="text"
              className={`${!isAdded && "hidden"} w-8 items-center border-r-1 border-l-1 border-slate-500 text-center outline-none`}
              onChange={handleInput}
              value={amt}
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
