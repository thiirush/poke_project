import { BadgeProps } from "@chakra-ui/react";

export interface PokemonTypeBadgeProps extends BadgeProps {
  name: string;
  customBgColor?: string;
}
