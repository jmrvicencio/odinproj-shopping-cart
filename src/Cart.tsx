import { Link } from "react-router-dom";
import { useContext } from "react";
import { GamesContext, CartContext, Game } from "./App";
import AmtStepper from "./components/AmtStepper";

const Cart = () => {
  const { games } = useContext(GamesContext);
  const { cartItems } = useContext(CartContext);
  const gameCount = Object.keys(cartItems).length;

  return (
    <div className="flex gap-8 self-center pt-12">
      <div className="flex h-fit w-132 flex-col gap-8 rounded-4xl border-1 border-slate-800 p-8">
        {gameCount > 0 ? (
          Object.keys(cartItems).map((keyString) => {
            const key = Number(keyString);
            console.log(games?.[key]);
            return <CartItem key={key} id={key} game={games?.[key]} amt={cartItems[key]} />;
          })
        ) : (
          <div className="flex flex-col">
            <p>Cart is Empty</p>
            <Link to="/store" className="text-slate-400 underline hover:text-slate-200">
              Return to store
            </Link>
          </div>
        )}
      </div>
      <div className="h-fit w-64 rounded-4xl border-1 border-slate-800 p-8">
        <h1 className="text-xl font-bold">Games in Cart</h1>
        <p className="text-slate-200">
          {gameCount} <span className="text-slate-500">games in cart</span>
        </p>
        <p className="mt-4 text-sm text-slate-500">Api doesn't provide any prices.</p>
        <button type="button" className="mt-4 w-full cursor-pointer rounded-xl bg-orange-400 p-4 font-medium hover:bg-orange-500">
          Checkout
        </button>
      </div>
    </div>
  );
};

const CartItem = ({ id, game, amt }: { id: number; game: Game | undefined; amt: number }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

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

  const handleIncrement = (increment: number) => {
    const newAmt = Math.max(Math.min(increment + amt, 99), 0);
    const newCartItems = { ...cartItems, [id]: newAmt };
    if (newAmt == 0) delete newCartItems[id];

    setCartItems(newCartItems);
  };

  const handleRemove = () => {
    const newCartItems = { ...cartItems };
    delete newCartItems[id];

    setCartItems(newCartItems);
  };

  return (
    <div className="flex w-full flex-row gap-4">
      <div className="aspect-[16/9] h-24 rounded-xl bg-cover" style={{ backgroundImage: `url('${game?.background_image}')` }} />
      <div className="flex w-full flex-col">
        <h2 className="font-bold">{game?.name}</h2>
        <p className="text-slate-400">{game?.genres[0]?.name ?? "Unkown"}</p>
        <div className="relative flex h-full w-full flex-col items-end justify-end justify-self-stretch">
          <AmtStepper active={true} amt={amt} handleIncrement={handleIncrement} handleInput={handleInput} />
          <p className="cursor-pointer text-sm text-slate-500 underline hover:text-slate-300" onClick={handleRemove}>
            remove
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
