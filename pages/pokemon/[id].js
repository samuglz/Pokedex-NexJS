import Error from "components/Error";
import ResumePokemonCard from "components/ResumePokemonCard";

export default function PokemonResumePage(props) {
  console.log(props);
  const { error, msgError } = props;
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

export const getServerSideProps = async (context) => {
  const { params, res } = context;
  const { id } = params;

  const response = await fetch(`http://localhost:3000/api/pokemon/${id}`);

  if (response.ok) {
    const props = await response.json();
    return { props };
  }
  if (res) {
    res.writeHead(301, { location: "/" }).end();
  }
};
