import { ethers } from "ethers";
import { FhishClient } from "./sdk/FhishClient";
import { fheLog } from "./logger";

const isProd = process.env.NODE_ENV === 'production';

// Force proxy in production to bypass Mixed Content blocks
const rpcUrl = isProd ? "/rpc-proxy" : (process.env.NEXT_PUBLIC_RPC_URL || "http://161.35.63.119:8545");
const gatewayUrl = isProd ? "/gateway-proxy" : (process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || "http://161.35.63.119:3000");

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
