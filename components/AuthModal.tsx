"use client";

import Image from "next/image";
// import WagmiWrapper from "@/wagmi/wrapper";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

function AuthModal() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col gap-4 m-4 p-4 justify-center items-center">
          {ensAvatar && <Image alt="ENS Avatar" src={ensAvatar} />}
          {address && (
            <div className="text-black">
              {ensName ? `${ensName} (${address})` : address}
            </div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-center">Sign up</h2>
            <div className="flex gap-2 mt-4">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {connector.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AuthModal;
