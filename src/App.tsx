import "./App.css";
import useSWR from "swr";
import { CardPokemon } from "./Components/CardPokemon";
import { CircleArrowLeft, CircleArrowRight, Search } from "lucide-react";
import { useState } from "react";

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
  const limit = 12;
  const offset = page * limit;
  const { data, error, isLoading } = useSWR<TPokemons>(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    fetcher
  );

  // console.log(data);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loading loading-ring loading-xl text-accent"></span>
      </div>
    );
  if (error) return <p>Erreur : {error.message}</p>;

  const totalPages = data ? Math.ceil(data.count / limit) : 0;

  return (
    <div className="flex flex-col min-h-full py-10 gap-10 m-auto max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-center w-full">Pokédex</h1>
      <div className="flex w-full justify-between">
        <div className="join">
          <input
            type="text"
            className="input input-accent join-item"
            placeholder="Rechercher un pokemon …"
          />
          <button className="join-item btn btn-outline btn-accent">
            <Search size={16} />
          </button>
        </div>
        <select defaultValue="Pick a Runtime" className="select select-accent">
          <option disabled={true} defaultChecked={true}>
            Trier par type …
          </option>
          <option>npm</option>
          <option>Bun</option>
          <option>yarn</option>
        </select>
      </div>

      <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {data &&
          data.results.length > 0 &&
          data.results.map((pokemon: Pokemon) => (
            <CardPokemon key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
      <div className="join w-full justify-center gap-5">
        <button
          className="join-item btn btn-outline btn-accent"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          <CircleArrowLeft size={20} />
        </button>
        <button className="join-item btn border-accent cursor-auto rounded">
          Page {page}
        </button>
        <button
          className="join-item btn btn-outline btn-accent"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page + 1 >= totalPages}
        >
          <CircleArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
