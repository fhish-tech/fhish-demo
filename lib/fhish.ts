import { ethers } from "ethers";
import { FhishClient } from "./sdk/FhishClient";
import { fheLog } from "./logger";

const isProd = process.env.NODE_ENV === 'production';
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || (isProd ? "/rpc-proxy" : "http://161.35.63.119:8545");
const gatewayUrl = process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || (isProd ? "/gateway-proxy" : "http://161.35.63.119:3000");

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
