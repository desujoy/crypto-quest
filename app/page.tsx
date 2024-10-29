import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <p className="text-4xl font-bold text-center">Welcome to Crypto Quest</p>
      <Link
        href={"/game"}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-32 text-center"
      >
        Start Game
      </Link>
    </div>
  );
}

export default Home;
