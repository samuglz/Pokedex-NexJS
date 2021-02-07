import React, { useEffect, useState, useRef } from "react";
import Card from "../Card";

export default function index() {
  const [pokemons, setPokemons] = useState([]);
  const [offsetFetch, setOffsetFetch] = useState(0);
  const [loading, setLoading] = useState(false);

  const getRealIndexPokedex = (arrayIndex) => {
    return arrayIndex + offsetFetch + 1;
  };

  useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setLoading(true);
        setOffsetFetch((offsetFetch) => offsetFetch + 21);
      }
    });
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offsetFetch}&limit=21`)
      .then((res) => res.json())
      .then((data) => {
        const { results } = data;
        const newPokemons = results.map((pokemon, index) => {
          return { id: getRealIndexPokedex(index), name: pokemon.name };
        });
        const totalPokemon = [...pokemons, ...newPokemons];
        setPokemons([...totalPokemon]);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [offsetFetch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid gap-6 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
        {pokemons.map((pokemon) => {
          return <Card key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
      {loading && (
        <div className="w-10 h-10 border-b-4 border-l-4 border-t-4 animate-spin border-gray-500 border-solid rounded-full my-20"></div>
      )}
    </div>
  );
}
