import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen -mt-[64px]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4em"
        height="4em"
        viewBox="0 0 24 24"
        className="animate-spin"
      >
        <path
          fill="#0b74bb"
          d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
          opacity="0.5"
        />
        <path
          fill="#0b74bb"
          d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
        ></path>
      </svg>
    </div>
  );
}

export default Loader;
