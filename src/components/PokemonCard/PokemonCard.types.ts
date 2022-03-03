export interface PokemonCardComponentProps {
  id?: string;
  name: string;
  types: PokemonTypeProps[];
  image: string;
  number: string;
}

interface PokemonTypeProps {
  type: {
    name: string;
  };
}
