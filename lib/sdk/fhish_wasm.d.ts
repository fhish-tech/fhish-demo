/* tslint:disable */
/* eslint-disable */

export class FhisBool {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    and(other: FhisBool): FhisBool;
    decrypt(client_key: FhisClientKey): boolean;
    static deserialize(buffer: Uint8Array): FhisBool;
    static encrypt(value: boolean, client_key: FhisClientKey): FhisBool;
    static encrypt_with_public_key(value: boolean, public_key: FhisCompactPublicKey): FhisBool;
    mux(then_: FhisBool, else_: FhisBool): FhisBool;
    not(): FhisBool;
    or(other: FhisBool): FhisBool;
    static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FhisBool;
    safe_serialize(serialized_size_limit: bigint): Uint8Array;
    serialize(): Uint8Array;
    xor(other: FhisBool): FhisBool;
}

export class FhisClientKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisClientKey;
    static generate(config: FhisConfig): FhisClientKey;
    static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FhisClientKey;
    safe_serialize(serialized_size_limit: bigint): Uint8Array;
    serialize(): Uint8Array;
}

export class FhisCompactPublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisCompactPublicKey;
    static new(client_key: FhisClientKey): FhisCompactPublicKey;
    serialize(): Uint8Array;
}

export class FhisCompressedServerKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    decompress(): FhisServerKey;
    static deserialize(buffer: Uint8Array): FhisCompressedServerKey;
    static new(client_key: FhisClientKey): FhisCompressedServerKey;
    serialize(): Uint8Array;
}

export class FhisConfig {
    free(): void;
    [Symbol.dispose](): void;
    constructor();
}

export class FhisPublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisPublicKey;
    static new(client_key: FhisClientKey): FhisPublicKey;
    serialize(): Uint8Array;
}

export class FhisServerKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisServerKey;
    static new(client_key: FhisClientKey): FhisServerKey;
    static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FhisServerKey;
    safe_serialize(serialized_size_limit: bigint): Uint8Array;
    serialize(): Uint8Array;
}

export class FhisShortintClientKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisShortintClientKey;
    static new(config: FhisShortintConfig): FhisShortintClientKey;
    serialize(): Uint8Array;
}

export class FhisShortintCompactCiphertextList {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisShortintCompactCiphertextList;
    expand(): FhisShortintUint2;
    serialize(): Uint8Array;
    size_bytes(): number;
}

export class FhisShortintCompactPublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisShortintCompactPublicKey;
    encrypt(value: number): FhisShortintCompactCiphertextList;
    static new(client_key: FhisShortintClientKey): FhisShortintCompactPublicKey;
    serialize(): Uint8Array;
    size_bytes(): number;
}

export class FhisShortintCompressedPublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    decompress(): FhisShortintCompactPublicKey;
    static deserialize(buffer: Uint8Array): FhisShortintCompressedPublicKey;
    static new(client_key: FhisShortintClientKey): FhisShortintCompressedPublicKey;
    serialize(): Uint8Array;
}

export class FhisShortintConfig {
    free(): void;
    [Symbol.dispose](): void;
    static compact_pk(): FhisShortintConfig;
    constructor();
    static pbs_ks_small(): FhisShortintConfig;
    static small(): FhisShortintConfig;
}

export class FhisShortintPublicKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    static deserialize(buffer: Uint8Array): FhisShortintPublicKey;
    static new(client_key: FhisShortintClientKey): FhisShortintPublicKey;
    serialize(): Uint8Array;
}

export class FhisShortintServerKey {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(ct1: FhisShortintUint2, ct2: FhisShortintUint2): FhisShortintUint2;
    static deserialize(buffer: Uint8Array): FhisShortintServerKey;
    mul(ct1: FhisShortintUint2, ct2: FhisShortintUint2): FhisShortintUint2;
    static new(client_key: FhisShortintClientKey): FhisShortintServerKey;
    serialize(): Uint8Array;
    sub(ct1: FhisShortintUint2, ct2: FhisShortintUint2): FhisShortintUint2;
}

export class FhisShortintUint2 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    decrypt(client_key: FhisShortintClientKey): number;
    static deserialize(buffer: Uint8Array): FhisShortintUint2;
    static encrypt(value: number, public_key: FhisShortintPublicKey): FhisShortintUint2;
    static encrypt_compact(value: number, compact_public_key: FhisShortintCompactPublicKey): FhisShortintCompactCiphertextList;
    serialize(): Uint8Array;
}

export class FhisUint32 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(other: FhisUint32): FhisUint32;
    add_scalar(scalar: number): FhisUint32;
    bitand(other: FhisUint32): FhisUint32;
    bitnot(): FhisUint32;
    bitor(other: FhisUint32): FhisUint32;
    bitxor(other: FhisUint32): FhisUint32;
    decrypt(client_key: FhisClientKey): number;
    static deserialize(buffer: Uint8Array): FhisUint32;
    static encrypt(value: number, client_key: FhisClientKey): FhisUint32;
    static encrypt_trivial(value: number): FhisUint32;
    static encrypt_with_public_key(value: number, public_key: FhisCompactPublicKey): FhisUint32;
    eq(other: FhisUint32): FhisBool;
    ge(other: FhisUint32): FhisBool;
    gt(other: FhisUint32): FhisBool;
    le(other: FhisUint32): FhisBool;
    left_shift(shift: number): FhisUint32;
    lt(other: FhisUint32): FhisBool;
    max(other: FhisUint32): FhisUint32;
    min(other: FhisUint32): FhisUint32;
    mul(other: FhisUint32): FhisUint32;
    mul_scalar(scalar: number): FhisUint32;
    ne(other: FhisUint32): FhisBool;
    right_shift(shift: number): FhisUint32;
    static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FhisUint32;
    safe_serialize(serialized_size_limit: bigint): Uint8Array;
    serialize(): Uint8Array;
    sub(other: FhisUint32): FhisUint32;
    sub_scalar(scalar: number): FhisUint32;
}

export class FhisUint64 {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    add(other: FhisUint64): FhisUint64;
    add_scalar(scalar: bigint): FhisUint64;
    bitand(other: FhisUint64): FhisUint64;
    bitor(other: FhisUint64): FhisUint64;
    bitxor(other: FhisUint64): FhisUint64;
    decrypt(client_key: FhisClientKey): bigint;
    static deserialize(buffer: Uint8Array): FhisUint64;
    static encrypt(value: bigint, client_key: FhisClientKey): FhisUint64;
    static encrypt_trivial(value: bigint): FhisUint64;
    static encrypt_with_public_key(value: bigint, public_key: FhisCompactPublicKey): FhisUint64;
    eq(other: FhisUint64): FhisBool;
    ge(other: FhisUint64): FhisBool;
    gt(other: FhisUint64): FhisBool;
    le(other: FhisUint64): FhisBool;
    lt(other: FhisUint64): FhisBool;
    max(other: FhisUint64): FhisUint64;
    min(other: FhisUint64): FhisUint64;
    mul(other: FhisUint64): FhisUint64;
    mul_scalar(scalar: bigint): FhisUint64;
    ne(other: FhisUint64): FhisBool;
    static safe_deserialize(buffer: Uint8Array, serialized_size_limit: bigint): FhisUint64;
    safe_serialize(serialized_size_limit: bigint): Uint8Array;
    serialize(): Uint8Array;
    sub(other: FhisUint64): FhisUint64;
    sub_scalar(scalar: bigint): FhisUint64;
}

export function init_panic_hook(): void;

export function main(): void;

export function set_server_key(server_key: FhisServerKey): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_fhisshortintclientkey_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintcompactciphertextlist_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintcompactpublickey_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintcompressedpublickey_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintconfig_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintpublickey_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintserverkey_free: (a: number, b: number) => void;
    readonly __wbg_fhisshortintuint2_free: (a: number, b: number) => void;
    readonly fhisshortintclientkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintclientkey_new: (a: number) => number;
    readonly fhisshortintclientkey_serialize: (a: number) => [number, number];
    readonly fhisshortintcompactciphertextlist_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintcompactciphertextlist_expand: (a: number) => [number, number, number];
    readonly fhisshortintcompactciphertextlist_serialize: (a: number) => [number, number];
    readonly fhisshortintcompactciphertextlist_size_bytes: (a: number) => number;
    readonly fhisshortintcompactpublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintcompactpublickey_encrypt: (a: number, b: number) => [number, number, number];
    readonly fhisshortintcompactpublickey_new: (a: number) => [number, number, number];
    readonly fhisshortintcompactpublickey_serialize: (a: number) => [number, number];
    readonly fhisshortintcompactpublickey_size_bytes: (a: number) => number;
    readonly fhisshortintcompressedpublickey_decompress: (a: number) => [number, number, number];
    readonly fhisshortintcompressedpublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintcompressedpublickey_new: (a: number) => [number, number, number];
    readonly fhisshortintcompressedpublickey_serialize: (a: number) => [number, number];
    readonly fhisshortintconfig_compact_pk: () => number;
    readonly fhisshortintconfig_default: () => number;
    readonly fhisshortintconfig_pbs_ks_small: () => number;
    readonly fhisshortintpublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintpublickey_new: (a: number) => [number, number, number];
    readonly fhisshortintpublickey_serialize: (a: number) => [number, number];
    readonly fhisshortintserverkey_add: (a: number, b: number, c: number) => [number, number, number];
    readonly fhisshortintserverkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintserverkey_mul: (a: number, b: number, c: number) => [number, number, number];
    readonly fhisshortintserverkey_new: (a: number) => number;
    readonly fhisshortintserverkey_serialize: (a: number) => [number, number];
    readonly fhisshortintserverkey_sub: (a: number, b: number, c: number) => [number, number, number];
    readonly fhisshortintuint2_decrypt: (a: number, b: number) => [number, number, number];
    readonly fhisshortintuint2_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisshortintuint2_encrypt: (a: number, b: number) => [number, number, number];
    readonly fhisshortintuint2_encrypt_compact: (a: number, b: number) => [number, number, number];
    readonly fhisshortintuint2_serialize: (a: number) => [number, number];
    readonly fhisshortintconfig_small: () => number;
    readonly __wbg_fhisuint32_free: (a: number, b: number) => void;
    readonly __wbg_fhisuint64_free: (a: number, b: number) => void;
    readonly fhisuint32_add: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_add_scalar: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_bitand: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_bitnot: (a: number) => [number, number, number];
    readonly fhisuint32_bitor: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_bitxor: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_decrypt: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_encrypt: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_encrypt_trivial: (a: number) => [number, number, number];
    readonly fhisuint32_eq: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_ge: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_gt: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_le: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_left_shift: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_lt: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_max: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_min: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_mul: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_mul_scalar: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_ne: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_right_shift: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_safe_deserialize: (a: number, b: number, c: bigint) => [number, number, number];
    readonly fhisuint32_safe_serialize: (a: number, b: bigint) => [number, number, number, number];
    readonly fhisuint32_serialize: (a: number) => [number, number, number, number];
    readonly fhisuint32_sub: (a: number, b: number) => [number, number, number];
    readonly fhisuint32_sub_scalar: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_add: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_add_scalar: (a: number, b: bigint) => [number, number, number];
    readonly fhisuint64_bitand: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_bitor: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_bitxor: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_decrypt: (a: number, b: number) => [bigint, number, number];
    readonly fhisuint64_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_encrypt: (a: bigint, b: number) => [number, number, number];
    readonly fhisuint64_encrypt_trivial: (a: bigint) => [number, number, number];
    readonly fhisuint64_eq: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_ge: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_gt: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_le: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_lt: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_max: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_min: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_mul: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_mul_scalar: (a: number, b: bigint) => [number, number, number];
    readonly fhisuint64_ne: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_safe_deserialize: (a: number, b: number, c: bigint) => [number, number, number];
    readonly fhisuint64_safe_serialize: (a: number, b: bigint) => [number, number, number, number];
    readonly fhisuint64_serialize: (a: number) => [number, number, number, number];
    readonly fhisuint64_sub: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_sub_scalar: (a: number, b: bigint) => [number, number, number];
    readonly set_server_key: (a: number) => [number, number];
    readonly __wbg_fhisclientkey_free: (a: number, b: number) => void;
    readonly __wbg_fhiscompactpublickey_free: (a: number, b: number) => void;
    readonly __wbg_fhiscompressedserverkey_free: (a: number, b: number) => void;
    readonly __wbg_fhisconfig_free: (a: number, b: number) => void;
    readonly __wbg_fhispublickey_free: (a: number, b: number) => void;
    readonly __wbg_fhisserverkey_free: (a: number, b: number) => void;
    readonly fhisbool_encrypt_with_public_key: (a: number, b: number) => [number, number, number];
    readonly fhisclientkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisclientkey_generate: (a: number) => [number, number, number];
    readonly fhisclientkey_safe_deserialize: (a: number, b: number, c: bigint) => [number, number, number];
    readonly fhisclientkey_safe_serialize: (a: number, b: bigint) => [number, number, number, number];
    readonly fhisclientkey_serialize: (a: number) => [number, number, number, number];
    readonly fhiscompactpublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhiscompactpublickey_new: (a: number) => [number, number, number];
    readonly fhiscompactpublickey_serialize: (a: number) => [number, number, number, number];
    readonly fhiscompressedserverkey_decompress: (a: number) => [number, number, number];
    readonly fhiscompressedserverkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhiscompressedserverkey_new: (a: number) => [number, number, number];
    readonly fhiscompressedserverkey_serialize: (a: number) => [number, number, number, number];
    readonly fhisconfig_default: () => number;
    readonly fhispublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhispublickey_new: (a: number) => [number, number, number];
    readonly fhispublickey_serialize: (a: number) => [number, number, number, number];
    readonly fhisserverkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisserverkey_new: (a: number) => [number, number, number];
    readonly fhisserverkey_safe_deserialize: (a: number, b: number, c: bigint) => [number, number, number];
    readonly fhisserverkey_safe_serialize: (a: number, b: bigint) => [number, number, number, number];
    readonly fhisserverkey_serialize: (a: number) => [number, number, number, number];
    readonly fhisuint32_encrypt_with_public_key: (a: number, b: number) => [number, number, number];
    readonly fhisuint64_encrypt_with_public_key: (a: bigint, b: number) => [number, number, number];
    readonly init_panic_hook: () => void;
    readonly main: () => void;
    readonly __wbg_fhisbool_free: (a: number, b: number) => void;
    readonly fhisbool_and: (a: number, b: number) => [number, number, number];
    readonly fhisbool_decrypt: (a: number, b: number) => [number, number, number];
    readonly fhisbool_deserialize: (a: number, b: number) => [number, number, number];
    readonly fhisbool_encrypt: (a: number, b: number) => [number, number, number];
    readonly fhisbool_mux: (a: number, b: number, c: number) => [number, number, number];
    readonly fhisbool_not: (a: number) => [number, number, number];
    readonly fhisbool_or: (a: number, b: number) => [number, number, number];
    readonly fhisbool_safe_deserialize: (a: number, b: number, c: bigint) => [number, number, number];
    readonly fhisbool_safe_serialize: (a: number, b: bigint) => [number, number, number, number];
    readonly fhisbool_serialize: (a: number) => [number, number, number, number];
    readonly fhisbool_xor: (a: number, b: number) => [number, number, number];
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
