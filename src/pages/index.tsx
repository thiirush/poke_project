import { Button, Container, Heading, SimpleGrid, Box } from "@chakra-ui/react";
import axios from "axios";
import Loader from "components/Loader";
import PokemonCard from "components/PokemonCard";
import { useLoading } from "hooks/useLoading";
import { GetServerSideProps } from "next/types";
import { useState } from "react";
import { api } from "services/api";

interface HomeProps {
  dados: [];
  next: string;
  pokemonData: PokemonData[];
}

interface PokemonData {
  id: string;
  name: string;
  sprites: { front_default?: string };
  types: {
    type: {
      name: string;
    }[];
  };
}

export default function Home({ pokemonData, next }: HomeProps) {
  const [allPokemons, setAllPokemons] = useState<any>(pokemonData);
  const [nextPage, setNextPage] = useState(next);

  const { isLoading, setIsLoading } = useLoading();

  const getMorePokemons = async () => {
    setIsLoading(true);
    const { data } = await axios.get(nextPage);

    setNextPage(data.next);

    const pokemonData = data.results.map(async (pokemon) => {
      const { data } = await axios.get(pokemon.url);
      return {
        ...data,
      };
    });

    const pokemonDataResolved = await Promise.all(pokemonData);

    setAllPokemons((prevPokemons) => [...prevPokemons, ...pokemonDataResolved]);

    setIsLoading(false);
  };

  return (
    <Box as="section" py="40px">
      {isLoading && <Loader />}

      <Container maxW="container.md">
        <Heading mb="8" as="h1">
          Lista de Pokemons
        </Heading>

        <SimpleGrid spacing={4} columns={[1, 2, 3, 4]}>
          {allPokemons.map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.name}
                id={pokemon.id}
                number={String(pokemon.id).padStart(3, "0")}
                name={pokemon.name}
                image={pokemon.sprites?.front_default}
                types={pokemon.types}
              />
            );
          })}
        </SimpleGrid>
        <Button
          sx={{
            backgroundColor: "red.400",
            color: "#fff",
            width: "100%",
            marginTop: "40px",
            fontSize: "1.5rem",
            padding: "32px 20px",
          }}
          disabled={isLoading}
          _hover={{
            backgroundColor: "red.500",
          }}
          onClick={getMorePokemons}
        >
          VER MAIS POKEMONS
        </Button>
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get(`pokemon-form/?limit=100`);

  const getAllPokemonInfo = async (result) => {
    const dados = result.map(async (pokemon) => {
      const { data } = await api.get(`${pokemon.url}`);
      return {
        ...data,
      };
    });

    const allData = await Promise.all(dados);

    return allData;
  };

  const allPokemonInfo = await getAllPokemonInfo(data.results);

  return {
    props: {
      pokemonData: allPokemonInfo,
      next: data.next,
    },
  };
};
