import useSWR from "swr";
import { Pokemon } from "./App";
import clsx from "clsx";
import { colorType, PokemonTypes } from "./utils/colorsPokemonType";

type CardPokemonProps = {
  pokemon: Pokemon;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CardPokemon = ({ pokemon }: CardPokemonProps) => {
  const { data, error, isLoading } = useSWR(pokemon.url, fetcher);

  if (error) return <div>échec du chargement</div>;
  if (isLoading) return <div>chargement...</div>;

  const type: PokemonTypes = data.types[0].type.name;
  const borderColor = colorType[type];

  return (
    <div
      className={clsx("card bg-base-100 w-xs shadow-lg border-1")}
      style={{ borderColor: `${borderColor}` }}
    >
      <figure>
        <img
          src={data.sprites.other["dream_world"].front_default}
          alt="Shoes"
          className="h-64 w-auto object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{pokemon.name}</h2>
      </div>
    </div>
  );
};
