import React, { useEffect, useState } from "react";
import Card from "components/Card";
import Spinner from "components/Spinner";
import { FetchPokemons } from "services/PokemonApi";

export default function PokemonGallery() {
  const [pokemons, setPokemons] = useState([]);
  const [offsetFetch, setOffsetFetch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addScrollEvent = () => {
    document.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setOffsetFetch((offsetFetch) => offsetFetch + 24);
      }
    });
  };

  const fetchPokemonsData = async () => {
    setLoading(true);
    try {
      const newPokemons = await FetchPokemons(offsetFetch);
      const totalPokemon = [...pokemons, ...newPokemons];
      setPokemons([...totalPokemon]);
    } catch (error) {
      console.error(error);
      setError(error);
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
        <div className="bg-red-300 p-4 font-bold text-red-700 text-xl md:text-3xl rounded shadow-md flex flex-col justify-center items-center">
          <span>❌</span>
          <p className="text-center">
            Oops, something went wrong, try again later.
          </p>
        </div>
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
