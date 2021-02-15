import Error from "components/Error";
import ResumePokemonCard from "components/ResumePokemonCard";

export default function PokemonResumePage(props) {
  console.log(props);
  const { id, name, error, msgError } = props;
  return (
    <div className="flex justify-center items-center h-screen">
      {!error ? (
        <ResumePokemonCard pokemon={props} />
      ) : (
        <Error msgError={msgError} />
      )}
    </div>
  );
}

PokemonResumePage.getInitialProps = (context) => {
  const { query } = context;
  const { id } = query;
  return fetch(`http://localhost:3000/api/pokemon/${id}`).then(
    (apiResponse) => {
      if (apiResponse.ok) return apiResponse.json();
      return {
        error: true,
        msgError: "The page you are looking for does not exist",
      };
    }
  );
};
