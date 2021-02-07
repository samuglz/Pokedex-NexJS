import React from "react";

const Spinner = () => {
  return (
    <svg
      className="animate-spin h-10 w-10 mr-3 border-4 rounded-full border-gray-400"
      style={{
        borderRightColor: "transparent",
      }}
      viewBox="0 0 24 24"
    />
  );
};

export default Spinner;
