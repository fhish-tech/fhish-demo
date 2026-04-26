"use client";
import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { VOTING_ADDRESS, PRIVATE_VOTING_ABI } from "../lib/contracts";

export function ResetButton() {
  const [loading, setLoading] = useState(false);
  const { isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset the voting state? This will clear all votes on-chain and in the gateway.")) {
      return;
    }

    setLoading(true);
    try {
      // 1. Reset Gateway
      console.log("[Reset] Resetting gateway tally...");
      const gatewayRes = await fetch("/gateway-proxy/reset-tally", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-fhish-relayer-secret": process.env.NEXT_PUBLIC_FHISH_RELAYER_SECRET || ""
        }
      });
      
      if (!gatewayRes.ok) {
        const err = await gatewayRes.json();
        throw new Error(`Gateway reset failed: ${err.error || gatewayRes.statusText}`);
      }
      console.log("[Reset] Gateway tally reset success");

      // 2. Reset Contract
      console.log("[Reset] Resetting contract state...");
      const hash = await writeContractAsync({
        address: VOTING_ADDRESS as `0x${string}`,
        abi: PRIVATE_VOTING_ABI,
        functionName: "reset",
      });
      console.log("[Reset] Contract reset transaction submitted:", hash);
      
      alert("Reset successful! You can now vote again.");
      window.location.reload();
    } catch (e: any) {
      console.error("[Reset] FAILED:", e);
      alert(`Reset failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return null;

  return (
    <button
      onClick={handleReset}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-xs uppercase tracking-widest font-black"
    >
      {loading ? "Resetting..." : "Reset Demo"}
    </button>
  );
}
