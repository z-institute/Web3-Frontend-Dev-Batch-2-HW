import { defineConfig } from "@wagmi/cli";
import { erc, etherscan, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "generated.ts",
  contracts: [],
  plugins: [
    erc({
      721: true,
    }),
    react(),
  ],
});
