"use client";

import { PropsWithChildren, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { connectorsForWallets, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { initiaPrivyWallet, injectStyles, InterwovenKitProvider, PRIVY_APP_ID } from "@initia/interwovenkit-react";
// @ts-ignore
import interwovenKitStyles from "@initia/interwovenkit-react/styles.js";
import { PrivyProvider } from "@privy-io/react-auth";
import { ThemeProvider } from "next-themes";
import { fhishLocalChain, fhishMiniEVM } from "@/lib/initia";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [initiaPrivyWallet],
    },
  ],
  {
    appName: "Fhish Private Rollup",
    projectId: "a58eb7b4a24f0c45",
  }
);

const wagmiConfig = createConfig({
  connectors,
  chains: [fhishMiniEVM as any],
  transports: {
    [fhishMiniEVM.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: PropsWithChildren) {
  useEffect(() => {
    if (interwovenKitStyles) {
      injectStyles(interwovenKitStyles);
    }
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <RainbowKitProvider theme={darkTheme()}>
            <PrivyProvider
              appId={PRIVY_APP_ID}
              config={{
                loginMethodsAndOrder: {
                  primary: [`privy:${PRIVY_APP_ID}`, 'detected_ethereum_wallets'],
                },
              }}
            >
              <InterwovenKitProvider
                customChain={fhishLocalChain}
                // @ts-ignore
                customChains={[fhishLocalChain]}
                defaultChainId="fhish-1"
                theme="dark"
              >
                {children}
              </InterwovenKitProvider>
            </PrivyProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
