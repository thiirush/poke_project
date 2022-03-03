import { Box, Heading, HStack } from "@chakra-ui/react";
import PokemonTypeBadge from "components/PokemonTypeBadge";
import Link from "next/link";
import { memo } from "react";
import { PokemonCardComponentProps } from "./PokemonCard.types";

export default function PokemonCardComponent({
  id,
  name,
  types,
  image,
  number,
}: PokemonCardComponentProps) {
  return (
    <Link passHref href={`/pokemon/${name}`}>
      <Box
        _hover={{
          bgColor: "gray.200",
        }}
        sx={{
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          flexDir: "column",
          alignItems: "center",
          cursor: "pointer",
          transition: "0.3s ease-in-out",
        }}
        bg={"gray.100"}
      >
        <span style={{ fontSize: "12px" }} className="pokeId">
          Nº {number}
        </span>
        <img height={96} width={96} src={image} alt="" />
        <Heading as="h4" size="md" sx={{ textTransform: "Capitalize" }}>
          {name}
        </Heading>
        <HStack mt="2" spacing={2}>
          {types?.map(({ type }) => {
            return <PokemonTypeBadge key={type.name} name={type.name} />;
          })}
        </HStack>
      </Box>
    </Link>
  );
}

export const PokemonCard = memo(PokemonCardComponent);
