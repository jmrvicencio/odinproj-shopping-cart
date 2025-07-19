import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex w-full grow-1 flex-col items-center justify-center gap-8">
        <h1 className="text-5xl font-bold">
          Welcome to <span className="text-orange-400">GameCache</span>
        </h1>
        <p className="text-xl text-slate-400">your one stop shop to gaming!</p>
        <Link to="/store" className="rounded-full border-1 border-orange-400 px-6 py-4 text-xl text-orange-400">
          Start Shopping
        </Link>
      </div>
      <div className="m-4 w-fit self-center rounded-lg border-1 border-slate-600 p-4 text-slate-400">
        Layout reference taken from{" "}
        <a href="https://shivanerana.github.io/Shopping-Cart/" className="underline">
          Shivanerana's
        </a>{" "}
        output
      </div>
    </>
  );
};

export default Home;
