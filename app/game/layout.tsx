"use client";

import { useAccount, useConnect } from "wagmi";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  if (!isConnected) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex flex-col gap-4 m-4 pl-40 pr-4 justify-center items-start w-full">
          <h1 className="text-3xl font-bold">Connect Wallet</h1>
          <p className="text-lg text-gray-500">
            Connect your wallet to access the full functionality of the app.
          </p>
          <div className="flex flex-row flex-wrap gap-4">
            {connectors.length === 0 && (
              <p className="text-red-500">
                No connectors available. <br />
                Please install a wallet extension(eg. MetaMask) and refresh the
                page.
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
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}
