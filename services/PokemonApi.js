const PREFIX_URL_API = `https://pokeapi.co/api/v2/pokemon?offset=`;
const SUFIX_URL_API = `&limit=`;

const mapPokemons = (pokemonsData, offset) => {
  return pokemonsData.map((pokemon, index) => {
    return { id: getRealIndexPokedex(index, offset), name: pokemon.name };
  });
};

const getRealIndexPokedex = (arrayIndex, offset) => {
  return arrayIndex + offset + 1;
};

export const FetchPokemons = async (offset = 0, limitPerFetch = 24) => {
  try {
    const response = await fetch(
      `${PREFIX_URL_API}${offset}${SUFIX_URL_API}${limitPerFetch}`
    );
    const pokemons = await response.json();
    const { results: pokemonList } = pokemons;
    return mapPokemons(pokemonList, offset);
  } catch (error) {
    return error;
  }
};
