import { TPokemon } from "../utils/types";

type Statebase = {
  data: TPokemon;
  StatName: string;
  numTab: number;
  numMax: number;
};

export const StatBase = ({ data, StatName, numTab, numMax }: Statebase) => {
  return (
    <div className="flex items-center gap-4">
      <p className="py-1 w-45">
        {StatName} : {data.stats[numTab].base_stat}
      </p>
      <progress
        className="progress progress-accent w-100"
        value={data.stats[numTab].base_stat}
        max={numMax}
      ></progress>
    </div>
  );
};
