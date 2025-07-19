import React, { useRef } from "react";
import { Plus, Minus } from "lucide-react";

const AmtStepper = ({
  amt,
  active,
  handleIncrement,
  handleInput,
  handleKeyDown,
  handleAmtClicked,
}: {
  amt: number;
  active: boolean;
  handleIncrement: (amt: number) => void;
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAmtClicked?: (e: React.MouseEvent) => void;
}) => {
  const amtField = useRef(null);

  return (
    <div
      className={`group ${active && "is-added"} relative top-4 h-fit overflow-hidden rounded-full border-1 border-slate-500 px-1 opacity-0 transition-all duration-300 ease-in-out not-[.is-added]:border-orange-500 group-[.item:hover]:top-2 group-[.item:hover]:opacity-100 [.is-added]:top-0 [.is-added]:opacity-100`}
    >
      <div
        className={`flex min-h-6 ${active ? "w-18" : "w-4"} items-center justify-end gap-1 transition-[width] duration-300 ease-in-out`}
        onClick={handleAmtClicked}
      >
        <Minus className={`${!active && "hidden"} h-6 w-4 min-w-4 cursor-pointer stroke-slate-200`} onClick={() => handleIncrement(-1)} />
        <input
          ref={amtField}
          type="text"
          className={`${!active && "hidden"} w-8 items-center border-r-1 border-l-1 border-slate-500 text-center outline-none`}
          onChange={handleInput}
          value={amt}
          onKeyDown={handleKeyDown}
        />
        <Plus className="h-6 w-4 min-w-4 cursor-pointer not-group-[.is-added]:stroke-orange-500" onClick={() => handleIncrement(+1)} />
      </div>
    </div>
  );
};

export default AmtStepper;
