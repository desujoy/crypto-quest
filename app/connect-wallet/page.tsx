"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function ConnectWalletPage() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<string | null>("Error connecting wallet");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateAddress = async () => {
      const res = await fetch("/api/connect-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ walletAddress: address }),
      });
      if (res.status !== 200) {
        setError("Error connecting wallet: " + (await res.text()));
      } else {
        setError(null);
      }
      setLoading(false);
    };
    if (isConnected) {
      updateAddress();
    }
  }, [isConnected, address]);

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      {loading ? (
        <div className="flex flex-col gap-4 m-4 md:pl-[10vw] pr-4 justify-center items-start w-full">
          <h1 className="text-3xl font-bold">Connecting Wallet</h1>
          <p className="text-lg text-gray-500">Please wait...</p>
        </div>
      ) : (
        <>
          {isConnected ? (
            error === null ? (
              <div className="flex flex-col gap-4 m-4 md:pl-[10vw] pr-4 justify-center items-start w-full">
                <h1 className="text-3xl font-bold">Successfully Connected</h1>
                <div className="flex flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="text-black">
                      <span className="text-lg font-bold">
                        Connected Address:
                      </span>{" "}
                      {address}
                    </div>
                    <Link
                      href={"/game"}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md w-32 text-center"
                    >
                      Continue
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 m-4 md:pl-[10vw] pr-4 justify-center items-start w-full">
                <h1 className="text-3xl font-bold">Error Connecting Wallet</h1>
                <p className="text-lg text-red-500">{error}</p>
              </div>
            )
          ) : (
            <div className="flex flex-col gap-4 m-4 md:pl-[10vw] pr-4 justify-center items-start w-full">
              <h1 className="text-3xl font-bold">Connect Wallet</h1>
              <p className="text-lg text-gray-500">
                Connect your wallet to access the full functionality of the app.
              </p>
              <div className="flex flex-row flex-wrap gap-4">
                {connectors.length === 0 && (
                  <p className="text-red-500">
                    No connectors available. <br />
                    Please install a wallet extension(eg. MetaMask) and refresh
                    the page.
                  </p>
                )}
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <div className="w-auto bg-gray-50 h-screen max-md:hidden">
        <Image
          className="object-cover w-auto h-full"
          src={"/img/wallet-cover.png"}
          alt="Connect Wallet"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
