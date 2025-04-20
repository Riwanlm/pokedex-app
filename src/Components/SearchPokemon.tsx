import { Search } from "lucide-react";
import { useState } from "react";

type TSearchPokemon = {
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SearchPokemon = ({ setSearch }: TSearchPokemon) => {
  const [value, setValue] = useState("");

  return (
    <div className="join">
      <input
        type="text"
        className="input input-accent join-item"
        placeholder="Rechercher un pokemon …"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setSearch(value.trim());
        }}
      />
      <button
        className="join-item btn btn-outline btn-accent"
        onClick={() => setSearch(value.trim())}
      >
        <Search size={16} />
      </button>
    </div>
  );
};
