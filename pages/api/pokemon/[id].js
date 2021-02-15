import { getAPokemon } from "services/PokemonApi";

export default async (req, res) => {
  const { query } = req;
  const { id } = query;
  const pokemon = await getAPokemon(id);
  if (!pokemon.message) {
    res.json(pokemon);
  }
  res.status(404).end();
};
