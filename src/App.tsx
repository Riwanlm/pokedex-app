import "./App.css";
import useSWR from "swr";
import { CardPokemon } from "./Components/CardPokemon";
import { useRef, useState } from "react";

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
  const { data, error, isLoading } = useSWR<TPokemons>(
    `https://pokeapi.co/api/v2/pokemon?limit=20`,
    fetcher
  );
  const modalRef = useRef<HTMLDialogElement>(null);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <div className="flex flex-col min-h-full py-10 gap-10 m-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold text-center w-full">Pokédex</h1>
        <div className="flex w-full justify-between">
          <input
            type="text"
            className="input input-accent"
            placeholder="Rechercher un pokemon …"
          />
          <select
            defaultValue="Pick a Runtime"
            className="select select-accent"
          >
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
              <CardPokemon
                key={pokemon.name}
                pokemon={pokemon}
                modalRef={modalRef}
              />
            ))}
        </div>
        <div className="join w-full justify-center gap-5">
          <button className="join-item btn btn-outline btn-accent">«</button>
          <button className="join-item btn btn-outline btn-accent">
            Page 1
          </button>
          <button className="join-item btn btn-outline btn-accent">»</button>
        </div>
      </div>

      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default App;
