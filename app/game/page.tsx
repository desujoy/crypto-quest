"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function GamePage() {
  const { data: session } = useSession();
  const { address } = useAccount();
  const [playerName, setPlayerName] = useState("");
  const [playerRegNo, setPlayerRegNo] = useState("");
  useEffect(() => {
    if (session && session.user && session.user.name && session.user.regno) {
      setPlayerName(session.user.name);
      setPlayerRegNo(session.user.regno);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-4xl font-bold">Welcome to Crypto Quest</p>
      <p className="text-2xl font-bold text-pretty p-4">
        Your Name: {playerName}
        <br />
        Your Registration Number: {playerRegNo}
        <br />
        Your wallet address: {address}
      </p>
      <div className="flex flex-row gap-4">
        <Link href={"/game/0"} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Start Game 0
        </Link>
        <Link href={"/game/1"} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Start Game 1
        </Link>
      </div>
    </div>
  );
}
