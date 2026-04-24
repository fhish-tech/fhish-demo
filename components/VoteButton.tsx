"use client";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ethers } from "ethers";
import { createFhishClient, FhishClient } from "../lib/fhish";
import { VOTING_ADDRESS, PRIVATE_VOTING_ABI, GATEWAY_ADDRESS } from "../lib/contracts";

const log = {
  info: (...args: any[]) => console.log(`[VoteButton]`, new Date().toISOString(), ...args),
  error: (...args: any[]) => console.error(`[VoteButton] ERROR:`, new Date().toISOString(), ...args),
  warn: (...args: any[]) => console.warn(`[VoteButton] WARN:`, new Date().toISOString(), ...args),
};

export function VoteButton({ proposalId, vote, label, className }: {
  proposalId: number;
  vote: 0 | 1;
  label: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [encryptionTime, setEncryptionTime] = useState<number | null>(null);
  const [ciphertextSize, setCiphertextSize] = useState<number | null>(null);
  const [gatewayResult, setGatewayResult] = useState<any>(null);
  
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  log.info("RENDER:", { proposalId, vote, label, isConnected, address });

  const handleVote = async () => {
    const startTime = Date.now();
    log.info("=== VOTE START (REAL FHE) ===", { proposalId, vote, label, address });
    
    if (!address) {
      log.error("Wallet not connected");
      alert("Connect wallet first");
      return;
    }

    setLoading(true);
    setTxHash(null);
    setError(null);
    setEncryptionTime(null);
    setCiphertextSize(null);
    setGatewayResult(null);

    let client: FhishClient | null = null;

    try {
      log.info("Step 1: Getting browser provider...");
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        throw new Error("MetaMask or wallet not detected");
      }
      
      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      log.info("Signer:", signerAddress);

      log.info("Step 2: Creating FhishClient...");
      client = createFhishClient(provider, signer);
      
      log.info("Step 3: Initializing FhishClient...");
      const initStart = Date.now();
      await client.init();
      const initTime = Date.now() - initStart;
      log.info("✓ FhishClient.init() done in", initTime, "ms");

      log.info("Step 4: Encrypting vote with REAL FHE...");
      const encryptStart = Date.now();
      const ciphertext = await client.encryptVote(vote === 1);
      const encryptTime = Date.now() - encryptStart;
      setEncryptionTime(encryptTime);
      setCiphertextSize(ciphertext.length);
      
      log.info("✓ Encryption done in", encryptTime, "ms");
      log.info("Ciphertext size:", ciphertext.length, "bytes (REAL ENCRYPTED DATA!)");
      log.info("Ciphertext hex:", ethers.hexlify(ciphertext.slice(0, 64)) + "...");

      log.info("Step 5: Submitting ciphertext to GATEWAY for accumulation...");
      log.info("  Gateway URL:", process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL);
      
      const voteType = vote === 1 ? 'yes' : 'no';
      const gatewayStart = Date.now();
      const result = await client.submitVote(ciphertext, voteType);
      const gatewayTime = Date.now() - gatewayStart;
      
      log.info("✓ Gateway response:", result);
      log.info("  Gateway submission time:", gatewayTime, "ms");
      log.info("  Total YES votes:", result.totalYes);
      log.info("  Total NO votes:", result.totalNo);
      
      setGatewayResult(result);

      log.info("Step 6: Creating on-chain proof (hash of ciphertext)...");
      const ciphertextHash = ethers.keccak256(ciphertext);
      const handleA = vote === 1 ? ciphertextHash : "0x0000000000000000000000000000000000000000000000000000000000000000";
      const handleB = vote === 0 ? ciphertextHash : "0x0000000000000000000000000000000000000000000000000000000000000000";
      
      log.info("handleA (YES):", handleA);
      log.info("handleB (NO):", handleB);

      log.info("Step 7: Sending transaction to contract (for on-chain proof)...");
      log.info("Contract:", VOTING_ADDRESS);

      try {
        const txStart = Date.now();
        const hash = await writeContractAsync({
          address: VOTING_ADDRESS as `0x${string}`,
          abi: PRIVATE_VOTING_ABI,
          functionName: "vote",
          args: [handleA as `0x${string}`, handleB as `0x${string}`, "0x" as `0x${string}`, "0x" as `0x${string}`],
        });
        
        const txTime = Date.now() - txStart;
        log.info("✓ Transaction submitted!");
        log.info("  txHash:", hash);
        log.info("  tx duration:", txTime, "ms");
        
        setTxHash(hash);
      } catch (txErr: any) {
        log.warn("Transaction failed but vote was recorded:", txErr.message);
      }

      log.info("=== VOTE COMPLETE ===");
      log.info("  Total time:", Date.now() - startTime, "ms");
      log.info("  Vote recorded in GATEWAY (REAL FHE ACCUMULATION)");
      log.info("  On-chain proof:", txHash ? "submitted" : "skipped");

    } catch (e: any) {
      const errMsg = e.message || String(e);
      log.error("=== VOTE FAILED ===", errMsg);
      
      if (errMsg.includes("Failed to fetch")) {
        log.error("Network error - check if gateway is running");
        setError("Network error: check if gateway is running");
      } else if (errMsg.includes("WASM") || errMsg.includes("WebAssembly")) {
        log.error("WASM initialization failed");
        setError("WASM error: refresh page and try again");
      } else {
        setError(errMsg.slice(0, 200));
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleVote}
        disabled={loading || !isConnected}
        className={`px-6 py-4 rounded-xl font-bold border transition-all ${className || ""} ${loading || !isConnected ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Encrypting & Submitting...
          </span>
        ) : (
          label
        )}
      </button>
      
      {encryptionTime !== null && ciphertextSize !== null && (
        <p className="text-xs text-gray-500 text-center">
          Encrypted in {encryptionTime}ms • {ciphertextSize} bytes (FHE encrypted)
        </p>
      )}
      
      {gatewayResult && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <p className="text-emerald-400 text-sm font-medium">
            ✓ Vote recorded via REAL FHE!
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Tally: YES={gatewayResult.totalYes} • NO={gatewayResult.totalNo}
          </p>
        </div>
      )}
      
      {txHash && (
        <p className="text-sm text-emerald-400 text-center font-medium mt-2">
          On-chain proof:{" "}
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            {txHash.slice(0, 8)}...
          </a>
        </p>
      )}
      {error && (
        <p className="text-sm text-rose-400 text-center font-medium mt-2">
          Failed: {error}
        </p>
      )}
    </div>
  );
}
