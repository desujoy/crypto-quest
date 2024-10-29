"use client";

import { authUserToNameRegno } from "@/utils/string-man";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function GamePage() {
  const { data: session } = useSession();
  const { address } = useAccount();
  const [playerName, setPlayerName] = useState("");
  const [playerRegNo, setPlayerRegNo] = useState("");
  useEffect(() => {
    if (session && session.user && session.user.name) {
      const { userName, userRegNo } = authUserToNameRegno(session.user.name);
      setPlayerRegNo(userName);
      setPlayerName(userRegNo);
    }
  }, [session]);

  if (!session?.user?.email?.endsWith("@vitbhopal.ac.in")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-4xl font-bold text-pretty p-4">
          Currently this game is only available for VIT Bhopal students.
          <br />
          Please login with your VIT Bhopal email.
        </p>
        <div className="flex flex-row flex-wrap gap-4 justify-center items-center w-full">
          <p className="text-2xl font-bold text-pretty p-4">
            Your email: {session?.user?.email}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-32 text-center"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
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
    </div>
  );
}
