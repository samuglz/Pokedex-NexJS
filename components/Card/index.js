import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({ pokemon }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      className="w-56 h-44 md:w-60 md:h-48 lg:w-64 lg:h-60 shadow-md rounded flex flex-col items-center border-solid border-gray-300 border cursor-pointer grow"
      onClick={handleClick}
    >
      <img
        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
        alt="pokemon image"
        className="w-16 h-16 lg:w-32 lg:h-32 rounded-full shadow mt-2"
      />
      <div className="flex justify-center items-center flex-col">
        <p className="text-gray-600 text-xl font-pokemon-solid mt-2 capitalize">
          {pokemon.name}
        </p>
        <Link href={`/pokemon/${encodeURIComponent(pokemon.id)}`}>
          <a className="text-gray-600 text-lg font-pokemon-solid mt-2 capitalize">
            nº {pokemon.id}
          </a>
        </Link>
      </div>
    </div>
  );
}
