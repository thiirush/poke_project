import { Badge } from "@chakra-ui/react";
import { POKEMONS_TYPES_COLORS } from "styles/pokemonsTypesColors";
import { PokemonTypeBadgeProps } from "./PokemonTypeBadge.types";

export function PokemonTypeBadge({
  name,
  customBgColor,
  ...rest
}: PokemonTypeBadgeProps) {
  const bgColor = customBgColor
    ? customBgColor
    : POKEMONS_TYPES_COLORS[name]?.bgColor;
  return (
    <Badge
      bgColor={bgColor}
      color="#fff"
      borderRadius="6px"
      padding="4px 12px"
      {...rest}
    >
      {name}
    </Badge>
  );
}
