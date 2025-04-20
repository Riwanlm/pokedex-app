import "./App.css";
import useSWR from "swr";
import { CardPokemon } from "./Components/CardPokemon";
import { useState } from "react";
import { Pagination } from "./Components/Pagination";
import { SearchPokemon } from "./Components/SearchPokemon";

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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState<string | null>(null);
  const limit = 12;
  const offset = page * limit;

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

  const isLoading = paginatedLoading || searchLoading;
  const error = paginatedError || searchError;

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
      <h1 className="text-3xl font-bold text-center w-full">Pokédex</h1>
      <div className="flex w-full justify-between">
        <SearchPokemon setSearch={setSearch} />
        <select defaultValue="Pick a Runtime" className="select select-accent">
          <option disabled={true} defaultChecked={true}>
            Trier par type …
          </option>
          <option>npm</option>
          <option>Bun</option>
          <option>yarn</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-full h-32">
          <span className="loading loading-ring loading-xl text-accent"></span>
        </div>
      ) : null}
      {error ? <p className="text-red-500">Erreur lors du chargement</p> : null}

      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {search && searchedPokemon && (
          <CardPokemon
            pokemon={{
              name: searchedPokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${searchedPokemon.name}`,
            }}
          />
        )}
        {!search
          ? paginatedData?.results.map((pokemon) => (
              <CardPokemon key={pokemon.name} pokemon={pokemon} />
            ))
          : null}
      </div>
      {!search ? (
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
