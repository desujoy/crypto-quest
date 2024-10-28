import { defineConfig } from "@wagmi/cli";
import { foundry, type FoundryConfig } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "wagmi/generated.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "dapp",
    } as FoundryConfig),
  ],
});
