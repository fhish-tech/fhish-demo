import { ethers } from "ethers";
import { FhishClient } from "./sdk/FhishClient";
import { fheLog } from "./logger";

const isProd = process.env.NODE_ENV === 'production';

// Helper to get absolute base URL for proxies
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  return "";
};

// Force proxy in production with absolute URLs to ensure Wallets (Rabby/Metamask) can resolve them
const rpcUrl = isProd ? `${getBaseUrl()}/rpc-proxy` : (process.env.NEXT_PUBLIC_RPC_URL || "http://161.35.63.119:8545");
const gatewayUrl = isProd ? `${getBaseUrl()}/gateway-proxy` : (process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || "http://161.35.63.119:3000");

fheLog('info', 'Fhish Library Initialized', { rpcUrl, gatewayUrl, isProd });

export { FhishClient };

export function createFhishClient(provider: ethers.Provider, signer?: ethers.Signer): FhishClient {
  fheLog('info', 'Creating Fhish Client...', { hasSigner: !!signer, gatewayUrl });
  return new FhishClient(
    {
      gatewayUrl,
    },
    provider,
    signer
  );
}

export const publicProvider = new ethers.JsonRpcProvider(rpcUrl);
