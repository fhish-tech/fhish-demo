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
      const gatewayUrl = process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || "http://localhost:8080";
      const gatewayRes = await fetch(`${gatewayUrl}/reset-tally`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-api-key": "" // Default empty for local dev
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
      className="mt-4 text-xs text-gray-600 hover:text-rose-400 transition-colors uppercase tracking-widest font-bold"
    >
      {loading ? "Resetting..." : "Reset Demo State"}
    </button>
  );
}
