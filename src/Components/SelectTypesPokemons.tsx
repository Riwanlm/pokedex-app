import { PokemonTypes } from "../utils/colorsPokemonType";

type TSelectTypesPokemons = {
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  setSearchType: React.Dispatch<React.SetStateAction<string | null>>;
  searchType: string | null;
};

export const SelectTypesPokemons = ({
  setSearch,
  setSearchType,
  searchType,
}: TSelectTypesPokemons) => {
  const arrayOfTypes: PokemonTypes[] = [
    "fighting",
    "normal",
    "ground",
    "poison",
    "flying",
    "bug",
    "ghost",
    "rock",
    "steel",
    "fire",
    "water",
    "grass",
    "ice",
    "electric",
    "fairy",
    "psychic",
    "dragon",
    "dark",
    "shadow",
    "unknown",
  ];

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch(null);
    if (e.target.value === "All types") {
      setSearchType(null);
      return;
    }
    setSearchType(e.target.value);
  };

  return (
    <select
      onChange={(e) => handleSelect(e)}
      defaultValue={searchType ? searchType : 1}
      className="select select-accent"
    >
      <option>ALL TYPES</option>
      {arrayOfTypes.map((type) => (
        <option key={type} value={type}>
          {type.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
