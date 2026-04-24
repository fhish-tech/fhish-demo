"use client";
import { use, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { VOTING_ADDRESS, PRIVATE_VOTING_ABI, GATEWAY_ADDRESS } from "../../../lib/contracts";
import { VoteButton } from "../../../components/VoteButton";
import { RevealButton } from "../../../components/RevealButton";
import { ConnectWallet } from "../../../components/ConnectWallet";

const log = {
  info: (...args: any[]) => console.log(`[ProposalPage]`, new Date().toISOString(), ...args),
  error: (...args: any[]) => console.error(`[ProposalPage] ERROR:`, new Date().toISOString(), ...args),
  warn: (...args: any[]) => console.warn(`[ProposalPage] WARN:`, new Date().toISOString(), ...args),
};

export default function ProposalDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const proposalId = parseInt(id);
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    log.info("=== PAGE MOUNTED ===", { proposalId, isConnected });
    
    log.info("Configuration check:");
    log.info("  VOTING_ADDRESS:", VOTING_ADDRESS);
    log.info("  GATEWAY_ADDRESS:", GATEWAY_ADDRESS);
    log.info("  NEXT_PUBLIC_FHISH_GATEWAY_URL:", process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL);
    log.info("  NEXT_PUBLIC_RPC_URL:", process.env.NEXT_PUBLIC_RPC_URL);
    
    return () => {
      log.info("=== PAGE UNMOUNTED ===");
    };
  }, [proposalId]);

  const { data: isDecrypted } = useReadContract({
    address: VOTING_ADDRESS as `0x${string}`,
    abi: PRIVATE_VOTING_ABI,
    functionName: "isDecrypted",
    query: { refetchInterval: 3000 },
  });

  const { data: tallyA } = useReadContract({
    address: VOTING_ADDRESS as `0x${string}`,
    abi: PRIVATE_VOTING_ABI,
    functionName: "finalTallyA",
    query: { refetchInterval: 3000 },
  });

  const { data: tallyB } = useReadContract({
    address: VOTING_ADDRESS as `0x${string}`,
    abi: PRIVATE_VOTING_ABI,
    functionName: "finalTallyB",
    query: { refetchInterval: 3000 },
  });

  const { data: voteCountA } = useReadContract({
    address: VOTING_ADDRESS as `0x${string}`,
    abi: PRIVATE_VOTING_ABI,
    functionName: "voteCountA",
    query: { refetchInterval: 5000 },
  });

  const { data: voteCountB } = useReadContract({
    address: VOTING_ADDRESS as `0x${string}`,
    abi: PRIVATE_VOTING_ABI,
    functionName: "voteCountB",
    query: { refetchInterval: 5000 },
  });

  const revealed = isDecrypted ?? false;
  const yesVotes = tallyA ? Number(tallyA) : 0;
  const noVotes = tallyB ? Number(tallyB) : 0;
  const encryptedYesVotes = voteCountA ? Number(voteCountA) : 0;
  const encryptedNoVotes = voteCountB ? Number(voteCountB) : 0;

  if (!mounted) {
    return (
      <main className="max-w-3xl mx-auto py-12">
        <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-800 rounded w-1/3"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-white">
            Proposal #{proposalId.toString()}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            FHISH FHE Private Voting Demo
          </p>
        </div>
        <ConnectWallet />
      </header>

      <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-10 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-100 leading-tight">
          Fund Marketing Initiative
        </h2>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          The DAO Treasury currently holds substantial reserves. This proposal seeks
          to allocate a budget for the upcoming global marketing campaign to increase
          protocol adoption.
        </p>

        {!revealed && (
          <div className="mb-8 bg-black/40 rounded-2xl p-6 border border-gray-800/80">
            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-4 text-center">
              Encrypted Vote Count
            </h3>
            <div className="flex justify-center gap-12 text-lg">
              <div className="text-emerald-400 font-bold bg-emerald-500/10 px-6 py-3 rounded-xl border border-emerald-500/20">
                YES: {encryptedYesVotes}
              </div>
              <div className="text-rose-400 font-bold bg-rose-500/10 px-6 py-3 rounded-xl border border-rose-500/20">
                NO: {encryptedNoVotes}
              </div>
            </div>
            <p className="text-gray-600 text-xs text-center mt-4">
              Votes are encrypted and counted on-chain
            </p>
          </div>
        )}

        {revealed && (
          <div className="mb-12 bg-black/40 rounded-2xl p-8 border border-gray-800/80">
            <h3 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-6 text-center">
              Final Decrypted Result
            </h3>
            <div className="flex justify-center gap-12 text-2xl">
              <div className="text-emerald-400 font-bold bg-emerald-500/10 px-8 py-4 rounded-2xl border border-emerald-500/20">
                YES: {yesVotes}
              </div>
              <div className="text-rose-400 font-bold bg-rose-500/10 px-8 py-4 rounded-2xl border border-rose-500/20">
                NO: {noVotes}
              </div>
            </div>
            <div
              className={`mt-8 text-center font-black text-3xl py-4 rounded-xl uppercase tracking-widest ${
                yesVotes > noVotes ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {yesVotes > noVotes ? "PASSED" : "FAILED"}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {!revealed && isConnected && (
            <div className="grid grid-cols-2 gap-6 pb-6 border-b border-gray-800">
              <VoteButton
                proposalId={proposalId}
                vote={1}
                label="Vote YES"
                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
              />
              <VoteButton
                proposalId={proposalId}
                vote={0}
                label="Vote NO"
                className="bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
              />
            </div>
          )}

          {isConnected && !revealed && (
            <RevealButton proposalId={proposalId} />
          )}

          {!isConnected && (
            <div className="text-center p-8 bg-black/50 border border-gray-800 rounded-2xl">
              <p className="text-gray-400 font-medium">Connect your wallet to vote</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800">
          <h4 className="text-gray-600 text-xs uppercase tracking-widest mb-2">How it works</h4>
          <div className="text-gray-500 text-sm space-y-1">
            <p>1. Your vote is encrypted locally using FHE (Fully Homomorphic Encryption)</p>
            <p>2. Encrypted votes are tallied on-chain without revealing individual choices</p>
            <p>3. The gateway decrypts the final tally without exposing your vote</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center">
        <p className="text-gray-600 text-sm">
          Powered by FHISH • Shortint FHE on Ethereum Sepolia
        </p>
        <p className="text-gray-700 text-xs mt-1">
          Gateway: {process.env.NEXT_PUBLIC_FHISH_GATEWAY_URL || "Not configured"}
        </p>
      </footer>
    </main>
  );
}
