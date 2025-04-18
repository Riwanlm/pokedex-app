export type TPokemon = {
  abilities: any[];
  base_experience: number;
  forms: any[];
  game_indices: any[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: any[];
  name: string;
  order: number;
  past_types: any[];
  species: any;
  sprites: Sprites;
  stats: Stat[];
  types: any[];
  weight: number;
};

export type Sprites = {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: any;
  versions: any;
};

export type Type2 = {
  name: string;
  url: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Stat2;
};

export type Stat2 = {
  name: string;
  url: string;
};
