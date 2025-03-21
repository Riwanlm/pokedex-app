import "./App.css";
import useSWR from "swr";
import { CardPokemon } from "./CardPokemon";

export type Pokemon = {
  name: string;
  url: string;
};

type PokemonsTypes = {
  count: number;
  next?: string;
  previous?: string;
  results: Pokemon[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function App() {
  const { data, error, isLoading } = useSWR<PokemonsTypes>(
    `https://pokeapi.co/api/v2/pokemon?limit=20`,
    fetcher
  );
  // console.log(data);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="flex flex-col items-center h-screen w-screen">
      <h1 className="text-center text-3xl pt-6 pb-6">Pokédex</h1>
      <div className="grid grid-cols-3 gap-4">
        {data &&
          data.results.length > 0 &&
          data.results.map((pokemon: Pokemon) => (
            <CardPokemon key={pokemon.name} pokemon={pokemon} />
          ))}
      </div>
    </div>
  );
}

export default App;
