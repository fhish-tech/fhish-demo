import { ethers } from "ethers";
import init, {
  FhisShortintConfig,
  FhisShortintClientKey,
  FhisShortintCompactPublicKey,
  FhisShortintCompactCiphertextList,
} from "./fhish_wasm.js";

let wasmLoaded: any = null;
let wasmInitPromise: Promise<any> | null = null;

const DEFAULT_GATEWAY_URL = "http://localhost:3000";

function log(prefix: string, ...args: any[]) {
  console.log(`[FhishSDK] ${prefix}`, ...args);
}

async function initWasmBrowser(): Promise<any> {
  if (wasmLoaded) return wasmLoaded;
  if (wasmInitPromise) return wasmInitPromise;

  wasmInitPromise = (async () => {
    log("Loading WASM...");
    
    try {
      await init({
        memory: new WebAssembly.Memory({ initial: 256, maximum: 512 }),
      });
    } catch (e) {
      log("Init with custom memory failed, trying default...");
      await init();
    }
    
    wasmLoaded = { 
      FhisShortintConfig,
      FhisShortintClientKey, 
      FhisShortintCompactPublicKey,
      FhisShortintCompactCiphertextList,
    };
    log("WASM loaded successfully");
    return wasmLoaded;
  })();

  return wasmInitPromise;
}

export interface EncryptedInputBuilder {
  add(value: number | bigint | boolean): EncryptedInputBuilder;
  add32(value: number | bigint): EncryptedInputBuilder;
  addBool(value: boolean): EncryptedInputBuilder;
  addShortint(value: number): EncryptedInputBuilder;
  encrypt(): Promise<{ handles: string[]; ciphertexts: Uint8Array[] }>;
}

export interface VoteResult {
  success: boolean;
  vote: 'yes' | 'no';
  totalYes: number;
  totalNo: number;
  message: string;
}

export interface TallyResult {
  yesVotes: number;
  noVotes: number;
  encryptedYesVotes: number;
  encryptedNoVotes: number;
  verified: boolean;
  duration: string;
}

export class FhishClient {
  private publicKey: any = null;
  private clientKey: any = null;
  private gatewayUrl: string;
  private initialized: boolean = false;

  constructor(
    config: { gatewayUrl?: string },
    _provider: ethers.Provider,
    _signer?: ethers.Signer
  ) {
    this.gatewayUrl = config.gatewayUrl ?? DEFAULT_GATEWAY_URL;
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    log("Initializing FhishClient...");
    const fhis = await initWasmBrowser();
    
    log("Fetching public key from gateway...");
    const publicKeyHex = await this.fetchPublicKey();
    log("Got public key from gateway:", publicKeyHex.length, "chars");
    
    const publicKeyBytes = this.hexToBytes(publicKeyHex);
    const publicKey = fhis.FhisShortintCompactPublicKey.deserialize(publicKeyBytes);
    (this as any).publicKey = publicKey;
    
    log("PublicKey deserialized successfully!");
    
    log("Creating clientKey for local decryption...");
    const config = fhis.FhisShortintConfig.compact_pk();
    const clientKey = fhis.FhisShortintClientKey.new(config);
    (this as any).clientKey = clientKey;
    
    log("Keys initialized successfully!");
    log("  - PublicKey: from gateway (for encryption)");
    log("  - ClientKey: local (for verification)");
    this.initialized = true;
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async encryptVote(support: boolean): Promise<Uint8Array> {
    if (!this.initialized || !(this as any).publicKey || !wasmLoaded) {
      throw new Error("FhishClient not initialized");
    }

    const voteValue = support ? 1 : 0;
    log("Encrypting vote:", support ? "YES (1)" : "NO (0)");
    
    try {
      log("Calling publicKey.encrypt (SHORTINT)...");
      const compactCt = (this as any).publicKey.encrypt(voteValue);
      log("Compact ciphertext created, size:", compactCt.size_bytes(), "bytes");
      
      log("Calling compactCt.expand...");
      const ct = compactCt.expand();
      const ctBytes = ct.serialize();
      
      log("Vote encrypted, ciphertext size:", ctBytes.length, "bytes");
      return ctBytes;
    } catch (err: any) {
      log("Encryption error:", err.message);
      throw err;
    }
  }

  async submitVote(ciphertext: Uint8Array, vote: 'yes' | 'no'): Promise<VoteResult> {
    const hexCiphertext = this.bytesToHex(ciphertext);
    
    log("Submitting vote to gateway:", vote, "ciphertext size:", ciphertext.length);
    
    const response = await fetch(`${this.gatewayUrl}/submit-vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ciphertext: hexCiphertext,
        vote
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gateway submission failed: ${response.status} — ${error}`);
    }

    const result = await response.json() as VoteResult;
    log("Vote submitted:", result);
    
    log("Verifying local decryption...");
    try {
      const ct = wasmLoaded.FhisShortintUint2.deserialize(ciphertext);
      const localValue = ct.decrypt((this as any).clientKey);
      log("Local verification - decrypted value:", localValue, "(expected:", vote === 'yes' ? 1 : 0, ")");
    } catch (e: any) {
      log("Local verification failed:", e.message);
    }
    
    return result;
  }

  async getTallyStatus(): Promise<{ yesVotes: number; noVotes: number; votingOpen: boolean }> {
    log("Fetching tally status from gateway...");
    
    const response = await fetch(`${this.gatewayUrl}/tally-status`);
    if (!response.ok) {
      throw new Error(`Gateway /tally-status failed: ${response.status}`);
    }

    const result = await response.json();
    log("Tally status:", result);
    return result;
  }

  async decryptTally(relayerSecret: string): Promise<TallyResult> {
    log("Requesting tally decryption...");
    
    const response = await fetch(`${this.gatewayUrl}/decrypt-tally`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-fhish-relayer-secret': relayerSecret
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gateway /decrypt-tally failed: ${response.status} — ${error}`);
    }

    const result = await response.json() as TallyResult;
    log("Tally decrypted:", result);
    return result;
  }

  getClientKeyHex(): string {
    if (!(this as any).clientKey) throw new Error("Client key not available");
    return this.bytesToHex((this as any).clientKey.serialize());
  }

  getPublicKeyHex(): string {
    if (!(this as any).publicKey) throw new Error("Public key not available");
    return this.bytesToHex((this as any).publicKey.serialize());
  }

  createEncryptedInput(_contractAddress: string, _userAddress: string): EncryptedInputBuilder {
    if (!this.initialized || !(this as any).publicKey) {
      throw new Error("FhishClient not initialized");
    }

    const publicKey = (this as any).publicKey;

    const items: Array<{
      type: "shortint";
      value: number;
    }> = [];

    const state: {
      ciphertexts: Uint8Array[];
      httpHandles: string[];
    } = {
      ciphertexts: [],
      httpHandles: [],
    };

    return {
      add(value: number | bigint | boolean): EncryptedInputBuilder {
        items.push({ type: "shortint", value: Number(value) });
        return this;
      },
      add32(value: number | bigint): EncryptedInputBuilder {
        items.push({ type: "shortint", value: Number(value) });
        return this;
      },
      addBool(value: boolean): EncryptedInputBuilder {
        items.push({ type: "shortint", value: value ? 1 : 0 });
        return this;
      },
      addShortint(value: number): EncryptedInputBuilder {
        items.push({ type: "shortint", value: value & 0x3 });
        return this;
      },
      async encrypt(): Promise<{ handles: string[]; ciphertexts: Uint8Array[] }> {
        log("Encrypting", items.length, "items with SHORTINT...");

        state.ciphertexts = [];
        state.httpHandles = [];

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          log(`Encrypting item ${i}:`, item.type, item.value);

          const compactCt = publicKey.encrypt(item.value);
          const ct = compactCt.expand();
          const ctBytes = ct.serialize();
          
          log("Ciphertext size:", ctBytes.length, "bytes");
          state.ciphertexts.push(ctBytes);
        }

        log("Encryption complete,", state.ciphertexts.length, "ciphertexts generated");
        return { handles: state.httpHandles, ciphertexts: state.ciphertexts };
      },
    };
  }

  private async fetchPublicKey(): Promise<string> {
    const url = `${this.gatewayUrl}/get-public-key`;
    log("Fetching public key from:", url);
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Gateway /get-public-key failed: ${res.status} — ${text}`);
    }
    const data = await res.json() as { publicKey: string };
    log("Public key received:", data.publicKey.length, "chars");
    return data.publicKey;
  }

  private bytesToHex(bytes: Uint8Array): string {
    return "0x" + Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
  }

  private hexToBytes(hex: string): Uint8Array {
    const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
    const bytes = new Uint8Array(cleanHex.length / 2);
    for (let i = 0; i < cleanHex.length; i += 2) {
      bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
    }
    return bytes;
  }
}

export { FhishClient as default };
