import { ethers } from "ethers";
import { FhishClient } from "./sdk/FhishClient";
import { fheLog } from "./logger";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545";
const DEFAULT_GATEWAY_URL = "http://localhost:8080";
const gatewayUrl = process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || DEFAULT_GATEWAY_URL;

fheLog('info', 'Fhish Library Initialized', { rpcUrl, gatewayUrl });

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
