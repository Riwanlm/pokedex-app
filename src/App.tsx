import "./App.css";
import useSWR from "swr";
import { CardPokemon } from "./Components/CardPokemon";
import { useState } from "react";
import { Pagination } from "./Components/Pagination";
import { SearchPokemon } from "./Components/SearchPokemon";
import { PokemonTypes } from "./utils/colorsPokemonType";

export type Pokemon = {
  name: string;
  url: string;
};

type TPokemons = {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
};

type TSearchPokemonType = {
  damage_relations: any;
  game_indices: any;
  generation: any;
  id: number;
  move_damage_class: any;
  moves: any;
  name: string;
  names: any;
  past_damage_relations: any;
  pokemon: TResultTypePokemon[];
  sprites: any;
};

type TResultTypePokemon = {
  pokemon: Pokemon;
  slot: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<string | null>(null);

  const limit = 12;
  const offset = page * limit;
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
    if (e.target.value === "All types") {
      setSearchType(null);
      return;
    }
    setSearchType(e.target.value);
  };

  const {
    data: paginatedData,
    error: paginatedError,
    isLoading: paginatedLoading,
  } = useSWR<TPokemons>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    fetcher
  );

  const {
    data: searchedPokemon,
    error: searchError,
    isLoading: searchLoading,
  } = useSWR(
    search ? `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}` : null,
    fetcher
  );

  const {
    data: searchedTypePokemon,
    error: typeError,
    isLoading: typeIsLoadin,
  } = useSWR<TSearchPokemonType>(
    searchType
      ? `https://pokeapi.co/api/v2/type/${searchType.toLocaleLowerCase()}`
      : null,
    fetcher
  );

  const isLoading = paginatedLoading || searchLoading || typeIsLoadin;
  const error = paginatedError || searchError || typeError;

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-ring loading-xl text-accent"></span>
      </div>
    );
  if (error)
    return (
      <>
        <p className="flex justify-center m-4">Erreur : {error.message}</p>
        <div className="flex justify-center">
          <button className="btn btn-accent" onClick={() => setSearch(null)}>
            Revenir à la liste
          </button>
        </div>
      </>
    );

  const totalPages = paginatedData ? Math.ceil(paginatedData.count / limit) : 0;

  return (
    <div className="flex flex-col min-h-full py-10 gap-10 m-auto max-w-4xl px-4">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-32">
          <span className="loading loading-ring loading-xl text-accent"></span>
        </div>
      ) : null}
      {error ? <p className="text-red-500">Erreur lors du chargement</p> : null}

      <h1 className="text-3xl font-bold text-center w-full">Pokédex</h1>
      <div className="flex w-full justify-between">
        <SearchPokemon setSearch={setSearch} />
        <select
          onChange={(e) => handleSelect(e)}
          defaultValue={searchType ? searchType : 1}
          className="select select-accent"
        >
          <option>All types</option>
          {arrayOfTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {search && searchedPokemon && (
          <CardPokemon
            pokemon={{
              name: searchedPokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${searchedPokemon.name}`,
            }}
          />
        )}

        {searchType
          ? searchedTypePokemon?.pokemon.map((pokemon) => (
              <CardPokemon
                key={pokemon.pokemon.name}
                pokemon={pokemon.pokemon}
              />
            ))
          : null}

        {!search && !searchType
          ? paginatedData?.results.map((pokemon) => (
              <CardPokemon key={pokemon.name} pokemon={pokemon} />
            ))
          : null}
      </div>
      {!search && !searchType ? (
        <Pagination setPage={setPage} page={page} totalPages={totalPages} />
      ) : null}
      {search ? (
        <div className="flex justify-center">
          <button className="btn btn-accent" onClick={() => setSearch(null)}>
            Revenir à la liste
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
