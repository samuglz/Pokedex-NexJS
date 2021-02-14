const PREFIX_URL_API = `https://pokeapi.co/api/v2/pokemon?offset=`;
const SUFIX_URL_API = `&limit=21`;

export const FetchPokemons = async (offset = 0) => {
  try {
    const data = await fetch(`${PREFIX_URL_API}${offset}${SUFIX_URL_API}`);
    return await data.json();
  } catch (error) {
    return error;
  }
};
