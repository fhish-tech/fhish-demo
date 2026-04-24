<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FHISH Demo — AGENTS.md

## CRITICAL: No External FHE Packages

**NEVER use external FHE packages in this demo:**
- ❌ `tfhe` npm package
- ❌ `node-tfhe` package
- ❌ `fhevmjs` (Zama SDK)
- ❌ Any Zama/Fhenix services

**USE:**
- ✅ `fhish-sdk-v2` (packages/fhish-sdk-v2/) - Our custom SDK
- ✅ `fhish-wasm` browser build (lib/sdk/pkg/)

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Wallet**: RainbowKit + wagmi (real wallet, NOT mock)
- **FHE**: fhish-wasm browser build
- **SDK**: fhish-sdk-v2

## Build Commands

```bash
# Install dependencies (NO tfhe packages!)
npm install

# Build SDK first
cd ../packages/fhish-sdk-v2
npm run build

# Copy WASM to demo
cp -r ../packages/fhish-wasm/pkg lib/sdk/

# Return to demo
cd ../../fhish-demo

# Start
npm run dev
```

## Key Files

| File | Purpose |
|------|---------|
| `app/proposal/[id]/page.tsx` | **Main voting page** |
| `components/VoteButton.tsx` | Vote with FHE encryption |
| `components/RevealButton.tsx` | Reveal results |
| `components/ConnectWallet.tsx` | RainbowKit connection |
| `lib/fhish.ts` | FhishClient factory |
| `lib/contracts.ts` | Contract ABIs |
| `lib/sdk/` | WASM files for browser |

## Voting Flow

```
1. User connects wallet (RainbowKit)
           │
           ▼
2. User clicks "Vote YES" or "Vote NO"
           │
           ▼
3. VoteButton encrypts in-browser:
   - YES = 1 (encrypted)
   - NO = 0 (encrypted)
           │  ~2KB ciphertext
           ▼
4. Encrypted vote sent to contract
           │
           ▼
5. User clicks "Reveal Results"
           │
           ▼
6. Gateway decrypts tally
           │
           ▼
7. Results displayed
```

## Environment Variables

```bash
NEXT_PUBLIC_FHISH_GATEWAY_URL=http://localhost:8080
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

## Gateway Requirement

**The FHISH gateway MUST be running for voting to work:**

```bash
cd ../fhish-gateway
npm run dev
```

The SDK fetches the public key from the gateway on initialization.

## Contract Integration

Voting uses the `PrivateVoting` contract:

```typescript
// lib/contracts.ts
export const VOTING_CONTRACT = {
  address: process.env.NEXT_PUBLIC_VOTING_CONTRACT || '0x...',
  abi: PrivateVotingAbi,
};

// Vote function
const write = useContractWrite({
  address: VOTING_CONTRACT.address,
  abi: VOTING_CONTRACT.abi,
  functionName: 'vote',
  args: [proposalId, encryptedVote], // encryptedVote is Uint8Array
});
```

## Testing

1. Start gateway: `cd ../fhish-gateway && npm run dev`
2. Start demo: `npm run dev`
3. Open http://localhost:3000
4. Connect wallet (RainbowKit)
5. Navigate to /proposal/1
6. Click Vote YES or Vote NO
7. Wait for confirmation
8. Click Reveal Results

## Important Notes

1. **Real Wallet**: Uses RainbowKit (not mock addresses)
2. **Gateway Required**: SDK needs gateway for public key
3. **WASM Files**: Must be in `lib/sdk/pkg/`
4. **Sepolia Testnet**: Demo runs on Sepolia (not mainnet)
