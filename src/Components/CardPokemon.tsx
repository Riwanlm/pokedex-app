import useSWR from "swr";
import { Pokemon } from "../App";
import clsx from "clsx";
import { colorType, PokemonTypes } from "../utils/colorsPokemonType";
import { TPokemon } from "../utils/types";
import { useRef, useState } from "react";
import { DialogCardPokemon } from "./DialogCardPokemon";

type CardPokemonProps = {
  pokemon: Pokemon;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const CardPokemon = ({ pokemon }: CardPokemonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { data, error, isLoading } = useSWR<TPokemon>(pokemon.url, fetcher);
  const modalRef = useRef<HTMLDialogElement>(null);

  if (error) return <div>échec du chargement</div>;
  if (isLoading) return <div>chargement...</div>;

  const type: PokemonTypes = data ? data.types[0].type.name : "unknown";
  const borderColor = colorType[type];

  const openModal = () => {
    console.log(data);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // console.log(data);

  return data ? (
    <>
      <div
        className={clsx(
          "flex flex-col items-center justify-between card bg-base-100 p-5 gap-1 w-full max-h cursor-pointer"
        )}
        style={{
          borderColor: `${borderColor}`,
          boxShadow: isHovered
            ? `0px 0px 10px 8px ${borderColor}`
            : `0px 0px 5px 2px inset ${borderColor}`,
          transform: isHovered ? "scale(1.01)" : "scale(1)",
          transition: "all 0.3s ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => openModal()}
      >
        <p className="card-title">#{data.id}</p>
        <img
          src={data.sprites.other["dream_world"].front_default}
          alt="image of the pokemon"
          className="w-1/2 h-auto object-cover"
        />
        <h2 className="card-title">{data.name}</h2>
      </div>
      <DialogCardPokemon
        modalRef={modalRef}
        data={data}
        borderColor={borderColor}
      />
    </>
  ) : null;
};
