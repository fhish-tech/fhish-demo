'use client';

import { useState, useCallback } from 'react';

interface VoteTally {
  yes: number;
  no: number;
  abstain: number;
}

export default function FhishDemo() {
  const [wasmReady, setWasmReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const [client, setClient] = useState<any>(null);
  const [ciphertextSizes, setCiphertextSizes] = useState<{
    shortint: number;
    testVote: number;
  }>({ shortint: 0, testVote: 0 });
  
  const [tally, setTally] = useState<VoteTally>({ yes: 0, no: 0, abstain: 0 });
  const [encryptedVotes, setEncryptedVotes] = useState<string[]>([]);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const log = useCallback((msg: string) => {
    setDebugLog(prev => [...prev.slice(-20), `[${new Date().toLocaleTimeString()}] ${msg}`]);
    console.log(`[FHISH Demo] ${msg}`);
  }, []);

  const loadSdk = async () => {
    if (wasmReady) return;
    
    setLoading(true);
    try {
      log('Loading SDK...');
      
      const { FhishClient } = await import('../../lib/sdk/FhishClient');
      const fhishClient = new FhishClient(
        { gatewayUrl: 'http://localhost:8080' },
        {} as any,
        undefined
      );
      
      log('Fetching public key...');
      await fhishClient.init();
      
      setClient(fhishClient);
      setWasmReady(true);
      setInitError(null);
      
      log('SDK Ready!');
      
      log('Testing encryption...');
      const testEnc = await fhishClient.encryptVote(true);
      setCiphertextSizes(prev => ({ ...prev, shortint: testEnc.length }));
      log(`Ciphertext: ${testEnc.length} bytes`);
      
    } catch (err: any) {
      const msg = err.message || String(err);
      log(`Error: ${msg}`);
      setInitError(msg);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        log(`Wallet: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
      } catch (err: any) {
        log(`Wallet error: ${err.message}`);
        alert('Please install MetaMask or another Web3 wallet');
      }
    } else {
      log('No wallet detected');
      alert('Please install MetaMask or another Web3 wallet to vote');
    }
  };

  const vote = async (voteValue: number) => {
    if (!wasmReady || !client) {
      log('SDK not ready');
      return;
    }
    
    if (!walletAddress) {
      await connectWallet();
      if (!walletAddress) return;
    }
    
    setLoading(true);
    try {
      log(`Encrypting vote: ${voteValue === 0 ? 'YES' : voteValue === 1 ? 'NO' : 'ABSTAIN'}`);
      
      const encrypted: Uint8Array = await client.encryptVote(voteValue === 1);
      const hex = '0x' + Array.from(encrypted).map((b: number) => b.toString(16).padStart(2, '0')).join('');
      log(`Encrypted: ${encrypted.length} bytes`);
      
      setEncryptedVotes(prev => [...prev, hex]);
      setTally(prev => ({
        yes: voteValue === 0 ? prev.yes + 1 : prev.yes,
        no: voteValue === 1 ? prev.no + 1 : prev.no,
        abstain: voteValue === 2 ? prev.abstain + 1 : prev.abstain,
      }));
      
      setHasVoted(true);
      log('Vote done!');
    } catch (err: any) {
      log(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            FHISH Private Voting
          </h1>
          <p className="text-xl text-gray-400">
            Zero-knowledge voting powered by FHE
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">System</h2>
              
              {!wasmReady ? (
                <button
                  onClick={loadSdk}
                  disabled={loading}
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 rounded-xl font-bold text-lg"
                >
                  {loading ? 'Loading SDK...' : 'Load SDK (257KB)'}
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">WASM</div>
                    <div className="text-2xl font-bold text-green-400">READY</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">Gateway</div>
                    <div className="text-2xl font-bold text-green-400">CONNECTED</div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">Ciphertext</div>
                    <div className="text-xl font-bold text-cyan-400">
                      {ciphertextSizes.shortint > 0 ? `${(ciphertextSizes.shortint / 1024).toFixed(0)} KB` : '-'}
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-sm">Votes</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {encryptedVotes.length}
                    </div>
                  </div>
                </div>
              )}
              
              {initError && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-sm">
                  Error: {initError}
                </div>
              )}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Cast Vote</h2>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => vote(0)}
                  disabled={!wasmReady || loading}
                  className="py-4 px-6 rounded-xl font-bold text-lg bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500"
                >
                  YES
                </button>
                <button
                  onClick={() => vote(1)}
                  disabled={!wasmReady || loading}
                  className="py-4 px-6 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-500 disabled:bg-gray-700 disabled:text-gray-500"
                >
                  NO
                </button>
                <button
                  onClick={() => vote(2)}
                  disabled={!wasmReady || loading}
                  className="py-4 px-6 rounded-xl font-bold text-lg bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500"
                >
                  ABSTAIN
                </button>
              </div>
              {hasVoted && (
                <p className="mt-4 text-center text-green-400">Vote submitted!</p>
              )}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold mb-4">Results</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-green-400">{tally.yes}</div>
                  <div className="text-gray-400">YES</div>
                </div>
                <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-red-400">{tally.no}</div>
                  <div className="text-gray-400">NO</div>
                </div>
                <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-4 text-center">
                  <div className="text-4xl font-black text-gray-400">{tally.abstain}</div>
                  <div className="text-gray-400">ABS</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Wallet</h2>
              {walletAddress ? (
                <div className="font-mono text-sm bg-gray-800 p-3 rounded-lg break-all">
                  {walletAddress}
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  disabled={!wasmReady}
                  className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-bold"
                >
                  Connect
                </button>
              )}
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Log</h2>
              <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs text-green-400 space-y-1">
                {debugLog.length === 0 && (
                  <div className="text-gray-500">Click &quot;Load SDK&quot; to start...</div>
                )}
                {debugLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
