"use client";
import Link from 'next/link';

export function ProposalCard({ proposalId, active, revealed, yesVotes, noVotes }: any) {
  return (
    <Link href={`/proposal/${proposalId}`}>
      <div className="glass p-8 rounded-3xl glass-hover transition-all duration-500 group cursor-pointer h-full flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Proposal #{proposalId.toString()}</h2>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-800 text-gray-400'}`}>
              {revealed ? 'Revealed' : (active ? 'Active' : 'Closed')}
            </span>
          </div>
          <p className="text-white/40 text-lg mb-8 leading-relaxed font-medium">
            Should the DAO allocate 1,000,000 INIT to the Fhish Liquidity Program?
          </p>
        </div>
        
        {revealed ? (
          <div className="bg-black/50 rounded-2xl p-6 border border-white/5">
            <div className="flex justify-between mb-4">
              <span className="text-emerald-400 font-bold uppercase tracking-tighter">YES: {yesVotes.toString()}</span>
              <span className="text-rose-400 font-bold uppercase tracking-tighter">NO: {noVotes.toString()}</span>
            </div>
            <div className={`text-center font-black text-xl py-3 rounded-xl uppercase tracking-[0.2em] ${yesVotes > noVotes ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {yesVotes > noVotes ? 'Passed' : 'Failed'}
            </div>
          </div>
        ) : (
          <div className="bg-black/50 rounded-2xl p-6 border border-white/5 flex items-center justify-center">
            <p className="text-white/20 text-center font-black uppercase tracking-[0.1em] text-xs">Votes encrypted — Tally pending</p>
          </div>
        )}
      </div>
    </Link>
  );
}
