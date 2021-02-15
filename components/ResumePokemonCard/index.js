export default function ResumePokemonCard({ pokemon }) {
  return (
    <div className="w-4/5 py-4 shadow-md rounded border-solid border-gray-300 border">
      <div className="flex flex-col items-center">
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
          alt="pokemon image"
          className="w-32 h-32 lg:w-32 lg:h-32 mt-2"
        />
        <div className="flex justify-center items-center flex-col">
          <p className="text-gray-600 text-xl font-pokemon-solid mt-2 capitalize">
            {pokemon.name}
          </p>

          <p className="text-gray-600 text-lg font-pokemon-solid mt-2 capitalize">
            nº {pokemon.id}
          </p>
        </div>
      </div>
    </div>
  );
}
