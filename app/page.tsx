import { ProposalCard } from '../components/ProposalCard';
import { ConnectWallet } from '../components/ConnectWallet';
import { Zap, Shield, Lock, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-mesh selection:bg-primary/30">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(173,70,255,0.5)]">
              <Zap size={18} className="-rotate-45 group-hover:-rotate-90 transition-transform duration-500 text-white fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic text-glow tracking-[0.2em]">Fhish</span>
          </div>

          <div className="flex items-center gap-4">
             <ConnectWallet />
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 animate-pulse-slow">
            <Shield size={12} /> Privacy Layer for Initia
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-6 leading-none">
            Private <span className="text-primary text-glow">Voting</span> <br/>
            On MiniEVM
          </h1>
          <p className="max-w-2xl text-white/50 text-lg font-medium leading-relaxed">
            Fhish brings Fully Homomorphic Encryption to Initia. <br/>
            Your vote is encrypted in-browser and tallied securely off-chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <FeatureCard icon={<Lock size={20}/>} title="End-to-End FHE" desc="Data is encrypted at the source using tfhe-rs WASM." />
          <FeatureCard icon={<Cpu size={20}/>} title="Off-chain Compute" desc="FHE computation is fulfilled by secure off-chain relayers." />
          <FeatureCard icon={<Zap size={20}/>} title="Gas Optimized" desc="Handles ensure minimal footprint on the MiniEVM." />
        </div>
        
        <div className="max-w-xl mx-auto">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-8 text-center">Active Proposal</h2>
          <ProposalCard proposalId={1} active={true} revealed={false} yesVotes={0} noVotes={0} />
        </div>
      </div>

      <footer className="py-10 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          Built for DoraHacks Initia Hackathon — Fhish-tech 2026
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass p-8 rounded-2xl glass-hover transition-all duration-500">
      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-primary mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold uppercase italic tracking-tighter mb-2">{title}</h3>
      <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
    </div>
  )
}
