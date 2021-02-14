import React, { useEffect, useState } from "react";
import Card from "components/Card";
import Spinner from "components/Spinner";
import Error from "components/Error";
import { FetchPokemons } from "services/PokemonApi";

const NUMBER_POKEMONS_PER_FETCH = 24;

export default function PokemonGallery() {
  const [pokemons, setPokemons] = useState([]);
  const [offsetFetch, setOffsetFetch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addScrollEvent = () => {
    document.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffsetFetch(
          (offsetFetch) => offsetFetch + NUMBER_POKEMONS_PER_FETCH
        );
      }
    });
  };

  const fetchPokemonsData = async () => {
    setLoading(true);
    try {
      const newPokemons = await FetchPokemons(
        offsetFetch,
        NUMBER_POKEMONS_PER_FETCH
      );
      const totalPokemon = [...pokemons, ...newPokemons];
      setPokemons([...totalPokemon]);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    addScrollEvent();
  }, []);

  useEffect(() => {
    fetchPokemonsData();
  }, [offsetFetch]);

  return (
    <div className="flex flex-col justify-center items-center">
      {error ? (
        <Error />
      ) : (
        <div className="grid gap-6 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
          {pokemons.map((pokemon) => {
            return <Card key={pokemon.id} pokemon={pokemon} />;
          })}
        </div>
      )}
      {loading && (
        <div className="my-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}
