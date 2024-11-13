import { metaMask } from "wagmi/connectors";
import {
  createConfig,
  cookieStorage,
  createStorage,
  http,
} from "wagmi";
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
      [sepolia.id]: http("https://rpc.sepolia.org"),
    },
  });
}
