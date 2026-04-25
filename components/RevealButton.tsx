"use client";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { createFhishClient, FhishClient } from "../lib/fhish";

const log = {
  info: (...args: any[]) => console.log(`[RevealButton]`, new Date().toISOString(), ...args),
  error: (...args: any[]) => console.error(`[RevealButton] ERROR:`, new Date().toISOString(), ...args),
};

const RELAYER_SECRET = process.env.NEXT_PUBLIC_FHISH_RELAYER_SECRET || 'fhish-default-secret';

export function RevealButton({ proposalId }: { proposalId: number }) {
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [tallyResult, setTallyResult] = useState<any>(null);
  const [tallyStatus, setTallyStatus] = useState<any>(null);
  
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) return;
    
    const fetchStatus = async () => {
      try {
        const client = createFhishClient(null as any);
        const status = await client.getTallyStatus();
        setTallyStatus(status);
        log.info("Tally status refreshed", { ...status, yesVotes: "[ENCRYPTED]", noVotes: "[ENCRYPTED]" });
      } catch (e: any) {
        log.error("Failed to fetch tally status:", e.message);
      }
    };
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const handleReveal = async () => {
    log.info("=== REVEAL START ===", { proposalId });
    log.info("Relayer secret configured:", RELAYER_SECRET !== 'fhish-default-secret');

    setLoading(true);
    setError("");
    setTallyResult(null);

    try {
      log.info("Step 1: Creating FhishClient...");
      const client = createFhishClient(null as any);
      
      log.info("Step 2: Requesting tally decryption from gateway...");
      const decryptStart = Date.now();
      const result = await client.decryptTally(RELAYER_SECRET);
      const decryptTime = Date.now() - decryptStart;
      
      log.info("✓ Decryption complete!");
      log.info("  YES votes (decrypted):", result.yesVotes);
      log.info("  NO votes (decrypted):", result.noVotes);
      log.info("  Encrypted count matched:", result.verified ? "YES ✓" : "NO ✗");
      log.info("  Decryption time:", decryptTime, "ms");
      
      setTallyResult(result);
      setRequested(true);

    } catch (e: any) {
      const errMsg = e.message || String(e);
      log.error("=== REVEAL FAILED ===", errMsg);
      
      if (errMsg.includes("403")) {
        setError("Unauthorized: Check relayer secret");
      } else if (errMsg.includes("400")) {
        setError("No votes accumulated yet");
      } else {
        setError(errMsg.slice(0, 200));
      }
    }

    setLoading(false);
    log.info("=== REVEAL END ===");
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      <button
        onClick={handleReveal}
        disabled={loading || !isConnected}
        className="w-full py-4 bg-white text-black font-black uppercase tracking-wider rounded-2xl hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Decrypting Tally...
          </span>
        ) : (
          "Reveal Tally (Decrypt)"
        )}
      </button>
      
      {tallyStatus && (
        <div className="text-center p-3 bg-black/30 border border-gray-800 rounded-xl">
          <p className="text-gray-500 text-xs">
            Current tally (encrypted): YES={tallyStatus.yesVotes} • NO={tallyStatus.noVotes}
          </p>
        </div>
      )}
      
      {tallyResult && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6">
          <h4 className="text-emerald-400 font-bold text-lg mb-4 text-center">
            ✓ TALLY DECRYPTED (REAL FHE)
          </h4>
          <div className="flex justify-center gap-8 text-2xl font-bold">
            <div className="text-emerald-400">
              YES: {tallyResult.yesVotes}
            </div>
            <div className="text-rose-400">
              NO: {tallyResult.noVotes}
            </div>
          </div>
          <div className="mt-4 text-center">
            {tallyResult.verified ? (
              <p className="text-emerald-500 text-sm">✓ Decryption verified against encrypted count</p>
            ) : (
              <p className="text-rose-500 text-sm">⚠ Verification mismatch!</p>
            )}
          </div>
          <p className="text-gray-500 text-xs text-center mt-2">
            Decryption took {tallyResult.duration}ms
          </p>
        </div>
      )}
      
      {requested && !tallyResult && (
        <div className="text-center p-4 bg-black/50 border border-gray-800 rounded-2xl">
          <p className="text-gray-400 text-sm font-medium">
            Decryption requested. Check if relayer is running.
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-rose-400 text-center">Failed: {error}</p>
      )}
    </div>
  );
}
