import { defineChain } from "viem";

const isProd = process.env.NODE_ENV === 'production';
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || (isProd ? "/rpc-proxy" : "http://161.35.63.119:8545");

export const fhishLocalChain: any = {
  chain_id: "fhish-1",
  chain_name: "fhish",
  bech32_prefix: "init",
  pretty_name: "Fhish Local MiniEVM",
  network_type: "testnet",
  status: "live",
  apis: {
    rpc: [{ address: isProd ? "/rpc-proxy" : "http://161.35.63.119:26657" }],
    rest: [{ address: isProd ? "/rpc-proxy" : "http://161.35.63.119:1317" }],
    indexer: [{ address: isProd ? "/rpc-proxy" : "http://161.35.63.119:1317" }], 
    "json-rpc": [{ address: rpcUrl }]
  },
  fees: {
    fee_tokens: [{
      denom: "uinit",
      fixed_min_gas_price: 0,
      low_gas_price: 0,
      average_gas_price: 0,
      high_gas_price: 0
    }]
  },
  staking: { staking_tokens: [{ denom: "uinit" }] },
  native_assets: [{
    denom: "uinit",
    name: "INIT",
    symbol: "INIT",
    decimals: 6
  }],
  metadata: {
    is_l1: false,
    minitia: {
      type: "minievm"
    }
  }
};

export const fhishMiniEVM = defineChain({
  id: 1274840431040713,
  name: 'Fhish MiniEVM',
  nativeCurrency: { name: 'INIT', symbol: 'INIT', decimals: 6 },
  rpcUrls: {
    default: { http: [rpcUrl] },
    public: { http: [rpcUrl] },
  },
});
