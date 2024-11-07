import { metaMask } from "wagmi/connectors";
import { createConfig, cookieStorage, createStorage, webSocket } from "wagmi";
import { sepolia } from "wagmi/chains";

export function getConfig() {
  return createConfig({
    connectors: [metaMask()],
    chains: [sepolia],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [sepolia.id]: webSocket("wss://ethereum-sepolia-rpc.publicnode.com"),
    },
  });
}
