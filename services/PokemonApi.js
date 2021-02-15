const PREFIX_URL_API = `https://pokeapi.co/api/v2/pokemon`;
const OFFSET_API = `?offset=`;
const LIMIT_API = `&limit=`;

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
      `${PREFIX_URL_API}${OFFSET_API}${offset}${LIMIT_API}${limitPerFetch}`
    );
    const pokemons = await response.json();
    const { results: pokemonList } = pokemons;
    return mapPokemons(pokemonList, offset);
  } catch (error) {
    return error;
  }
};

export const getAPokemon = async (id) => {
  try {
    const response = await fetch(`${PREFIX_URL_API}/${id}`);
    const pokemon = await response.json();
    return pokemon;
  } catch (error) {
    return error;
  }
};
