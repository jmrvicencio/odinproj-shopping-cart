import { Check } from "lucide-react";

const GenreFilter = ({ genres, handleGenres }: { genres: Record<string, boolean>; handleGenres: Function }) => {
  return Object.keys(genres).map((genre, i) => (
    <div
      onClick={(e) => handleGenres(e, genre)}
      className="flex w-full cursor-pointer flex-row items-center gap-2 rounded-md px-4 py-2 hover:bg-slate-800"
    >
      <div className="flex flex-row">
        <input type="checkbox" className="peer hidden" onChange={() => {}} checked={genres[genre]} />
        <div className="group h-4.25 w-4.25 rounded-sm border-1 border-slate-600 peer-checked:bg-slate-300">
          {genres[genre] && <Check className="h-full w-full stroke-slate-900 peer-checked:hidden" />}
        </div>
      </div>
      <p>{genre}</p>
    </div>
  ));
  //   );
};

export default GenreFilter;
