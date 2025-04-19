import { Ruler, Weight } from "lucide-react";
import { TPokemon } from "../utils/types";
import { StatBase } from "./StatBase";

type DialogCardPokemon = {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  data: TPokemon | undefined;
  borderColor: string;
};

export const DialogCardPokemon = ({
  modalRef,
  data,
  borderColor,
}: DialogCardPokemon) => {
  const closeModalClickOutside = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = modalRef.current;
    const modalBox = dialog?.querySelector(".modal-box");

    if (dialog && modalBox && !modalBox.contains(e.target as Node)) {
      dialog.close();
    }
  };

  const formatPokemonWeight = (weight: number): string => {
    const formattedValue = (weight / 10).toFixed(1).replace(".", ",");
    return formattedValue + " kg";
  };

  const formatPokemonHeight = (height: number): string => {
    const formattedValue = height * 10;
    return formattedValue.toString() + " cm";
  };

  return data ? (
    <dialog
      ref={modalRef}
      onClick={(e) => closeModalClickOutside(e)}
      className="modal"
    >
      <div className="modal-box w-11/12 max-w-2xl">
        <img
          src={data.sprites.other["dream_world"].front_default}
          alt="image of the pokemon"
          className="w-2/4 h-auto object-cover mx-auto relative top-20"
        />
        <div
          className="bg-neutral-content rounded-2xl p-4 text-neutral shadow-xl shadow-green-400/6 mx-auto"
          style={{
            boxShadow: `0px 5px 15px 10px ${borderColor}`,
          }}
        >
          <div className="h-20"></div>
          <h3 className="font-bold text-3xl text-center">
            {data.name.toUpperCase()}
          </h3>
          <div className="flex justify-evenly py-4">
            <div>
              <Ruler size={40} className="mx-auto" />
              <p className="py-1">
                Taille : {formatPokemonHeight(data.height)}
              </p>
            </div>
            <div>
              <Weight size={40} className="mx-auto" />
              <p className="py-1">Poids : {formatPokemonWeight(data.weight)}</p>
            </div>
          </div>
          <StatBase
            data={data}
            StatName="Point de vie"
            numTab={0}
            numMax={300}
          />
          <StatBase data={data} StatName="Attaque" numTab={1} numMax={181} />
          <StatBase data={data} StatName="Défense" numTab={2} numMax={230} />
          <StatBase
            data={data}
            StatName="Attaque Spéciale"
            numTab={3}
            numMax={180}
          />
          <StatBase
            data={data}
            StatName="Défense Spéciale"
            numTab={4}
            numMax={230}
          />
          <StatBase data={data} StatName="Vitesse" numTab={5} numMax={180} />
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle border-accent btn-white absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  ) : null;
};
