import React, { useEffect, useState } from "react";
import Card from "../Card";

export default function index() {
  const [pokemons, setPokemons] = useState([]);
  const [limitPerFetch, setLimitPerFetch] = useState(0);

  const getRealIndexPokedex = (arrayIndex) => {
    return arrayIndex + limitPerFetch + 1;
  };

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        const { results: pokemons } = data;
        setPokemons(
          pokemons.map((pokemon, index) => {
            return { id: getRealIndexPokedex(index), name: pokemon.name };
          })
        );
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid gap-6 grid-flow-row lg:grid-cols-3 md:grid-cols-2">
      {pokemons.map((pokemon) => {
        return <Card key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
}
