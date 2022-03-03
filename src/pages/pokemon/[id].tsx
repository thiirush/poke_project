import { GetServerSideProps } from "next/types";
import {
  Box,
  Text,
  Heading,
  HStack,
  Flex,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

import { api } from "services/api";
import PokemonTypeBadge from "components/PokemonTypeBadge";
import StatsItem from "components/StatsItem";
import GeneralInfoCard from "components/GeneralInfoCard";
import { POKEMONS_SINGLE_COLORS } from "styles/pokemonSingleColors";
import Link from "next/link";

interface PokemonDataProps {
  abilities: PokemonDataPropsAbilities[];
  id: string;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonDataPropsSprites;
  types: PokemonDataPropsTypes[];
  stats: PokemonDataPropsStats[];
  base_experience: string;
}

interface PokemonDataPropsAbilities {
  ability: { name: string };
}
interface PokemonDataPropsSprites {
  other: {
    home: {
      front_default: string;
    };
  };
}
interface PokemonDataPropsTypes {
  type: {
    name: string;
  };
}
interface PokemonDataPropsStats {
  base_stat: number;
  stat: { name: string };
}

interface SinglePokemonProps {
  pokemonData: PokemonDataProps;
}

export default function SinglePokemon({ pokemonData }: SinglePokemonProps) {
  const {
    abilities,
    height,
    id,
    name,
    weight,
    sprites,
    types,
    stats,
    base_experience,
  } = pokemonData;

  const heightFormated = height / 10;

  const pokemonNumber = id.length > 3 ? id : String(id).padStart(3, "0");

  const pokemonType =
    types.length > 1 && types[0].type.name == "normal" ? types[1] : types[0];

  const { bgColor, primaryColor } =
    POKEMONS_SINGLE_COLORS[pokemonType.type.name];

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link passHref href="/">
        <Flex sx={{ cursor: "pointer" }} mb="4" alignItems="center" gap="2">
          <img src="/ic_left_arrow.svg" alt="" /> Back
        </Flex>
      </Link>
      <SimpleGrid columns={[1, 2]}>
        <Box borderRadius="6px 0px 0px 6px" bgColor="gray.100" padding="36px">
          <Text fontSize="12px" textTransform="uppercase">
            Nº {pokemonNumber}
          </Text>
          <Heading
            mb={4}
            textTransform="capitalize"
            fontWeight="400"
            fontSize={["2rem", "2.625rem"]}
          >
            {name}
          </Heading>

          <HStack>
            {types?.map(({ type }) => {
              return (
                <PokemonTypeBadge
                  key={type.name}
                  name={type.name}
                  fontSize={"16px"}
                  padding="12px 26px"
                />
              );
            })}
          </HStack>

          <img src={sprites.other.home.front_default} alt="" />
        </Box>

        <Box bgColor={bgColor} borderRadius="0px 6px 6px 0px" padding="36px">
          <Heading fontSize="2rem" mb="4">
            General Info
          </Heading>

          <Flex gap={2}>
            <GeneralInfoCard
              bgColor={primaryColor}
              title="Height"
              value={`${heightFormated} m`}
            />
            <GeneralInfoCard
              bgColor={primaryColor}
              title="Weight"
              value={`${weight} kg`}
            />
            <GeneralInfoCard
              bgColor={primaryColor}
              title="Base XP"
              value={base_experience}
            />
          </Flex>

          <Heading fontSize="2rem" mt="5" mb="4">
            Stats
          </Heading>

          <Stack>
            {stats?.map((stat) => {
              return (
                <StatsItem
                  key={stat.stat.name}
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={primaryColor}
                />
              );
            })}
          </Stack>

          <Heading fontSize="2rem" mt="5" mb="4">
            Abilities
          </Heading>

          <Flex gap={2} wrap={"wrap"}>
            {abilities?.map((abilitie) => (
              <PokemonTypeBadge
                key={abilitie.ability.name}
                name={abilitie.ability.name}
                padding={4}
                fontSize="1rem"
                customBgColor={primaryColor}
              />
            ))}
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const pokemonId = query.id;

  try {
    const { data } = await api.get(`pokemon/${pokemonId}`);

    return {
      props: {
        pokemonData: data,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
