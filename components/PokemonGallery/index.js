import React, { useEffect, useState } from "react";
import Card from "../Card";
import Spinner from "../Spinner";

export default function index() {
  const [pokemons, setPokemons] = useState([]);
  const [offsetFetch, setOffsetFetch] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRealIndexPokedex = (arrayIndex) => {
    return arrayIndex + offsetFetch + 1;
  };

  const addScrollEvent = () => {
    document.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setLoading(true);
        setOffsetFetch((offsetFetch) => offsetFetch + 21);
      }
    });
  };

  const mapPokemons = (pokemonsData) => {
    return pokemonsData.map((pokemon, index) => {
      return { id: getRealIndexPokedex(index), name: pokemon.name };
    });
  };

  const fetchPokemonsData = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetFetch}&limit=21`)
      .then((res) => res.json())
      .then((apiResponse) => {
        const { results: pokemonList } = apiResponse;
        const newPokemons = mapPokemons(pokemonList);
        const totalPokemon = [...pokemons, ...newPokemons];
        setPokemons([...totalPokemon]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    addScrollEvent();
  }, []);

  useEffect(() => {
    fetchPokemonsData();
  }, [offsetFetch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid gap-6 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
        {pokemons.map((pokemon) => {
          return <Card key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      {loading && <Spinner />}
    </div>
  );
}
