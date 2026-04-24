import { ethers } from 'ethers';

interface FhishConfig {
    gatewayAddress?: string;
    gatewayContractAddress?: string;
    networkPublicKey?: string;
    chainId?: number;
    kmsAddress?: string;
    aclAddress?: string;
}
interface FhishPermit {
    publicKey: string;
    signature: string;
    privateKey: string;
}

declare function initFhis(gatewayUrl: string, wasmUrl?: string): Promise<any>;
interface EncryptedInputBuilder {
    add(value: number | bigint | boolean): EncryptedInputBuilder;
    add32(value: number | bigint): EncryptedInputBuilder;
    addBool(value: boolean): EncryptedInputBuilder;
    addShortint(value: number): EncryptedInputBuilder;
    encrypt(): Promise<{
        handles: string[];
        ciphertexts: Uint8Array[];
    }>;
    submitToGateway(signer: ethers.Signer, gatewayAddress: string): Promise<{
        handles: string[];
    }>;
}
declare class FhishClient {
    private config;
    private provider;
    private signer?;
    private publicKey;
    private shortintPublicKey;
    private clientKey;
    private shortintClientKey;
    private gatewayUrl;
    private initialized;
    constructor(config: Partial<FhishConfig> & {
        gatewayUrl?: string;
    }, provider: ethers.Provider, signer?: ethers.Signer);
    init(): Promise<void>;
    initWithClientKey(clientKeyHex: string, shortintClientKeyHex?: string): Promise<void>;
    isInitialized(): boolean;
    getPublicKeyHex(): string;
    getShortintClientKeyHex(): string;
    decrypt32(ciphertext: Uint8Array): number;
    decryptBool(ciphertext: Uint8Array): boolean;
    decryptShortint(ciphertext: Uint8Array): number;
    createEncryptedInput(_contractAddress: string, _userAddress: string): EncryptedInputBuilder;
    signPermit(contractAddress: string): Promise<FhishPermit>;
    private fetchPublicKey;
    private bytesToHex;
    private hexToBytes;
}

declare function bytesToBigInt(bytes: Uint8Array): bigint;
declare function bigIntToBytes(value: bigint): Uint8Array;
declare function toHexString(bytes: Uint8Array): string;
declare function fromHexString(hex: string): Uint8Array;

export { type EncryptedInputBuilder, FhishClient, type FhishConfig, type FhishPermit, bigIntToBytes, bytesToBigInt, fromHexString, initFhis, toHexString };
