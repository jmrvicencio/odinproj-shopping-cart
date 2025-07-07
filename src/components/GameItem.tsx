import { Link } from "react-router-dom";

const GameItem = ({ title, image, genre }: { title: string; image: string; genre: string }) => {
  const bgStyle = {
    backgroundImage: `url('${image}')`,
  };
  const bgShine = {
    background:
      "linear-gradient(12deg,rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.25) 57%, rgba(255, 255, 255, 0.24) 60%, rgba(255, 255, 255, 0.14) 100%)",
  };

  return (
    <Link to="/">
      <div className="group item relative cursor-pointer" onClick={() => console.log("item has been pressed")}>
        <div
          className="group transition-scale aspect-16/9 w-full scale-100 overflow-hidden rounded-2xl bg-slate-800 bg-cover duration-300 ease-in-out group-hover:scale-104"
          style={bgStyle}
        >
          <div
            className="relative inset-0 -top-1/4 h-full transition-all duration-300 ease-in-out group-[.item:hover]:top-0"
            style={bgShine}
          />
        </div>
        <h3 className="mt-2 text-xl font-bold">{title}</h3>
        <div className="relative flex flex-row justify-between pb-4">
          <p className="font-semibold text-slate-400 uppercase">{genre ? genre : "Unkown"}</p>
          <div className="absolute top-0 right-0 rounded-full border-1 border-slate-500 px-4 py-1">buy</div>
        </div>
      </div>
    </Link>
  );
};

export default GameItem;
