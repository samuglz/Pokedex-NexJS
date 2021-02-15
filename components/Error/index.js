import React from "react";

export default function Error({
  msgError = "Oops, something went wrong, try again later.",
}) {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="bg-red-300 p-4 font-bold text-red-700 text-xl md:text-3xl rounded shadow-md flex flex-col justify-center items-center">
        <span>❌</span>
        <p className="text-center py-2">{msgError} </p>
      </div>
    </div>
  );
}
