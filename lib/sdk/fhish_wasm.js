/* @ts-self-types="./fhish_wasm.d.ts" */

export class FhisBool {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisBool.prototype);
        obj.__wbg_ptr = ptr;
        FhisBoolFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisBoolFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisbool_free(ptr, 0);
    }
    /**
     * @param {FhisBool} other
     * @returns {FhisBool}
     */
    and(other) {
        _assertClass(other, FhisBool);
        const ret = wasm.fhisbool_and(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {boolean}
     */
    decrypt(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisbool_decrypt(this.__wbg_ptr, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] !== 0;
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisBool}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisbool_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {boolean} value
     * @param {FhisClientKey} client_key
     * @returns {FhisBool}
     */
    static encrypt(value, client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisbool_encrypt(value, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {boolean} value
     * @param {FhisCompactPublicKey} public_key
     * @returns {FhisBool}
     */
    static encrypt_with_public_key(value, public_key) {
        _assertClass(public_key, FhisCompactPublicKey);
        const ret = wasm.fhisbool_encrypt_with_public_key(value, public_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisBool} then_
     * @param {FhisBool} else_
     * @returns {FhisBool}
     */
    mux(then_, else_) {
        _assertClass(then_, FhisBool);
        _assertClass(else_, FhisBool);
        const ret = wasm.fhisbool_mux(this.__wbg_ptr, then_.__wbg_ptr, else_.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @returns {FhisBool}
     */
    not() {
        const ret = wasm.fhisbool_not(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisBool} other
     * @returns {FhisBool}
     */
    or(other) {
        _assertClass(other, FhisBool);
        const ret = wasm.fhisbool_or(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {bigint} serialized_size_limit
     * @returns {FhisBool}
     */
    static safe_deserialize(buffer, serialized_size_limit) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisbool_safe_deserialize(ptr0, len0, serialized_size_limit);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {bigint} serialized_size_limit
     * @returns {Uint8Array}
     */
    safe_serialize(serialized_size_limit) {
        const ret = wasm.fhisbool_safe_serialize(this.__wbg_ptr, serialized_size_limit);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisbool_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {FhisBool} other
     * @returns {FhisBool}
     */
    xor(other) {
        _assertClass(other, FhisBool);
        const ret = wasm.fhisbool_xor(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
}
if (Symbol.dispose) FhisBool.prototype[Symbol.dispose] = FhisBool.prototype.free;

export class FhisClientKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisClientKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisClientKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisclientkey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisClientKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisclientkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisClientKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisConfig} config
     * @returns {FhisClientKey}
     */
    static generate(config) {
        _assertClass(config, FhisConfig);
        const ret = wasm.fhisclientkey_generate(config.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisClientKey.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {bigint} serialized_size_limit
     * @returns {FhisClientKey}
     */
    static safe_deserialize(buffer, serialized_size_limit) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisclientkey_safe_deserialize(ptr0, len0, serialized_size_limit);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisClientKey.__wrap(ret[0]);
    }
    /**
     * @param {bigint} serialized_size_limit
     * @returns {Uint8Array}
     */
    safe_serialize(serialized_size_limit) {
        const ret = wasm.fhisclientkey_safe_serialize(this.__wbg_ptr, serialized_size_limit);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisclientkey_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisClientKey.prototype[Symbol.dispose] = FhisClientKey.prototype.free;

export class FhisCompactPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisCompactPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisCompactPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisCompactPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhiscompactpublickey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisCompactPublicKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhiscompactpublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisCompactPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {FhisCompactPublicKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhiscompactpublickey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisCompactPublicKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhiscompactpublickey_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisCompactPublicKey.prototype[Symbol.dispose] = FhisCompactPublicKey.prototype.free;

export class FhisCompressedServerKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisCompressedServerKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisCompressedServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisCompressedServerKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhiscompressedserverkey_free(ptr, 0);
    }
    /**
     * @returns {FhisServerKey}
     */
    decompress() {
        const ret = wasm.fhiscompressedserverkey_decompress(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisServerKey.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisCompressedServerKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhiscompressedserverkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisCompressedServerKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {FhisCompressedServerKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhiscompressedserverkey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisCompressedServerKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhiscompressedserverkey_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisCompressedServerKey.prototype[Symbol.dispose] = FhisCompressedServerKey.prototype.free;

export class FhisConfig {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisconfig_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.fhisconfig_default();
        this.__wbg_ptr = ret >>> 0;
        FhisConfigFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}
if (Symbol.dispose) FhisConfig.prototype[Symbol.dispose] = FhisConfig.prototype.free;

export class FhisPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhispublickey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisPublicKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhispublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {FhisPublicKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhispublickey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisPublicKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhispublickey_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisPublicKey.prototype[Symbol.dispose] = FhisPublicKey.prototype.free;

export class FhisServerKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisServerKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisServerKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisserverkey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisServerKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisserverkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisServerKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {FhisServerKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisserverkey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisServerKey.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {bigint} serialized_size_limit
     * @returns {FhisServerKey}
     */
    static safe_deserialize(buffer, serialized_size_limit) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisserverkey_safe_deserialize(ptr0, len0, serialized_size_limit);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisServerKey.__wrap(ret[0]);
    }
    /**
     * @param {bigint} serialized_size_limit
     * @returns {Uint8Array}
     */
    safe_serialize(serialized_size_limit) {
        const ret = wasm.fhisserverkey_safe_serialize(this.__wbg_ptr, serialized_size_limit);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisserverkey_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisServerKey.prototype[Symbol.dispose] = FhisServerKey.prototype.free;

export class FhisShortintClientKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintClientKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintClientKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintClientKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintclientkey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintClientKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintclientkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintClientKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintConfig} config
     * @returns {FhisShortintClientKey}
     */
    static new(config) {
        _assertClass(config, FhisShortintConfig);
        const ret = wasm.fhisshortintclientkey_new(config.__wbg_ptr);
        return FhisShortintClientKey.__wrap(ret);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintclientkey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisShortintClientKey.prototype[Symbol.dispose] = FhisShortintClientKey.prototype.free;

export class FhisShortintCompactCiphertextList {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintCompactCiphertextList.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintCompactCiphertextListFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintCompactCiphertextListFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintcompactciphertextlist_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintCompactCiphertextList}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintcompactciphertextlist_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactCiphertextList.__wrap(ret[0]);
    }
    /**
     * @returns {FhisShortintUint2}
     */
    expand() {
        const ret = wasm.fhisshortintcompactciphertextlist_expand(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintcompactciphertextlist_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    size_bytes() {
        const ret = wasm.fhisshortintcompactciphertextlist_size_bytes(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) FhisShortintCompactCiphertextList.prototype[Symbol.dispose] = FhisShortintCompactCiphertextList.prototype.free;

export class FhisShortintCompactPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintCompactPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintCompactPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintCompactPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintcompactpublickey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintCompactPublicKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintcompactpublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @returns {FhisShortintCompactCiphertextList}
     */
    encrypt(value) {
        const ret = wasm.fhisshortintcompactpublickey_encrypt(this.__wbg_ptr, value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactCiphertextList.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintClientKey} client_key
     * @returns {FhisShortintCompactPublicKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisShortintClientKey);
        const ret = wasm.fhisshortintcompactpublickey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactPublicKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintcompactpublickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    size_bytes() {
        const ret = wasm.fhisshortintcompactpublickey_size_bytes(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) FhisShortintCompactPublicKey.prototype[Symbol.dispose] = FhisShortintCompactPublicKey.prototype.free;

export class FhisShortintCompressedPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintCompressedPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintCompressedPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintCompressedPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintcompressedpublickey_free(ptr, 0);
    }
    /**
     * @returns {FhisShortintCompactPublicKey}
     */
    decompress() {
        const ret = wasm.fhisshortintcompressedpublickey_decompress(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintCompressedPublicKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintcompressedpublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompressedPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintClientKey} client_key
     * @returns {FhisShortintCompressedPublicKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisShortintClientKey);
        const ret = wasm.fhisshortintcompressedpublickey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompressedPublicKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintcompressedpublickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisShortintCompressedPublicKey.prototype[Symbol.dispose] = FhisShortintCompressedPublicKey.prototype.free;

export class FhisShortintConfig {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintConfig.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintConfigFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintConfigFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintconfig_free(ptr, 0);
    }
    /**
     * @returns {FhisShortintConfig}
     */
    static compact_pk() {
        const ret = wasm.fhisshortintconfig_compact_pk();
        return FhisShortintConfig.__wrap(ret);
    }
    constructor() {
        const ret = wasm.fhisshortintconfig_default();
        this.__wbg_ptr = ret >>> 0;
        FhisShortintConfigFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {FhisShortintConfig}
     */
    static pbs_ks_small() {
        const ret = wasm.fhisshortintconfig_pbs_ks_small();
        return FhisShortintConfig.__wrap(ret);
    }
    /**
     * @returns {FhisShortintConfig}
     */
    static small() {
        const ret = wasm.fhisshortintconfig_small();
        return FhisShortintConfig.__wrap(ret);
    }
}
if (Symbol.dispose) FhisShortintConfig.prototype[Symbol.dispose] = FhisShortintConfig.prototype.free;

export class FhisShortintPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintpublickey_free(ptr, 0);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintPublicKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintpublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintPublicKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintClientKey} client_key
     * @returns {FhisShortintPublicKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisShortintClientKey);
        const ret = wasm.fhisshortintpublickey_new(client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintPublicKey.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintpublickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisShortintPublicKey.prototype[Symbol.dispose] = FhisShortintPublicKey.prototype.free;

export class FhisShortintServerKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintServerKey.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintServerKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintServerKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintserverkey_free(ptr, 0);
    }
    /**
     * @param {FhisShortintUint2} ct1
     * @param {FhisShortintUint2} ct2
     * @returns {FhisShortintUint2}
     */
    add(ct1, ct2) {
        _assertClass(ct1, FhisShortintUint2);
        _assertClass(ct2, FhisShortintUint2);
        const ret = wasm.fhisshortintserverkey_add(this.__wbg_ptr, ct1.__wbg_ptr, ct2.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintServerKey}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintserverkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintServerKey.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintUint2} ct1
     * @param {FhisShortintUint2} ct2
     * @returns {FhisShortintUint2}
     */
    mul(ct1, ct2) {
        _assertClass(ct1, FhisShortintUint2);
        _assertClass(ct2, FhisShortintUint2);
        const ret = wasm.fhisshortintserverkey_mul(this.__wbg_ptr, ct1.__wbg_ptr, ct2.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
    /**
     * @param {FhisShortintClientKey} client_key
     * @returns {FhisShortintServerKey}
     */
    static new(client_key) {
        _assertClass(client_key, FhisShortintClientKey);
        const ret = wasm.fhisshortintserverkey_new(client_key.__wbg_ptr);
        return FhisShortintServerKey.__wrap(ret);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintserverkey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {FhisShortintUint2} ct1
     * @param {FhisShortintUint2} ct2
     * @returns {FhisShortintUint2}
     */
    sub(ct1, ct2) {
        _assertClass(ct1, FhisShortintUint2);
        _assertClass(ct2, FhisShortintUint2);
        const ret = wasm.fhisshortintserverkey_sub(this.__wbg_ptr, ct1.__wbg_ptr, ct2.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
}
if (Symbol.dispose) FhisShortintServerKey.prototype[Symbol.dispose] = FhisShortintServerKey.prototype.free;

export class FhisShortintUint2 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisShortintUint2.prototype);
        obj.__wbg_ptr = ptr;
        FhisShortintUint2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisShortintUint2Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisshortintuint2_free(ptr, 0);
    }
    /**
     * @param {FhisShortintClientKey} client_key
     * @returns {number}
     */
    decrypt(client_key) {
        _assertClass(client_key, FhisShortintClientKey);
        const ret = wasm.fhisshortintuint2_decrypt(this.__wbg_ptr, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0];
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisShortintUint2}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisshortintuint2_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @param {FhisShortintPublicKey} public_key
     * @returns {FhisShortintUint2}
     */
    static encrypt(value, public_key) {
        _assertClass(public_key, FhisShortintPublicKey);
        const ret = wasm.fhisshortintuint2_encrypt(value, public_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintUint2.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @param {FhisShortintCompactPublicKey} compact_public_key
     * @returns {FhisShortintCompactCiphertextList}
     */
    static encrypt_compact(value, compact_public_key) {
        _assertClass(compact_public_key, FhisShortintCompactPublicKey);
        const ret = wasm.fhisshortintuint2_encrypt_compact(value, compact_public_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisShortintCompactCiphertextList.__wrap(ret[0]);
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisshortintuint2_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) FhisShortintUint2.prototype[Symbol.dispose] = FhisShortintUint2.prototype.free;

export class FhisUint32 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisUint32.prototype);
        obj.__wbg_ptr = ptr;
        FhisUint32Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisUint32Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisuint32_free(ptr, 0);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    add(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_add(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} scalar
     * @returns {FhisUint32}
     */
    add_scalar(scalar) {
        const ret = wasm.fhisuint32_add_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    bitand(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_bitand(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @returns {FhisUint32}
     */
    bitnot() {
        const ret = wasm.fhisuint32_bitnot(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    bitor(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_bitor(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    bitxor(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_bitxor(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {number}
     */
    decrypt(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisuint32_decrypt(this.__wbg_ptr, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisUint32}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisuint32_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @param {FhisClientKey} client_key
     * @returns {FhisUint32}
     */
    static encrypt(value, client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisuint32_encrypt(value, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @returns {FhisUint32}
     */
    static encrypt_trivial(value) {
        const ret = wasm.fhisuint32_encrypt_trivial(value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} value
     * @param {FhisCompactPublicKey} public_key
     * @returns {FhisUint32}
     */
    static encrypt_with_public_key(value, public_key) {
        _assertClass(public_key, FhisCompactPublicKey);
        const ret = wasm.fhisuint32_encrypt_with_public_key(value, public_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    eq(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_eq(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    ge(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_ge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    gt(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_gt(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    le(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_le(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {number} shift
     * @returns {FhisUint32}
     */
    left_shift(shift) {
        const ret = wasm.fhisuint32_left_shift(this.__wbg_ptr, shift);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    lt(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_lt(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    max(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_max(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    min(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_min(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    mul(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_mul(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} scalar
     * @returns {FhisUint32}
     */
    mul_scalar(scalar) {
        const ret = wasm.fhisuint32_mul_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisBool}
     */
    ne(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_ne(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {number} shift
     * @returns {FhisUint32}
     */
    right_shift(shift) {
        const ret = wasm.fhisuint32_right_shift(this.__wbg_ptr, shift);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {bigint} serialized_size_limit
     * @returns {FhisUint32}
     */
    static safe_deserialize(buffer, serialized_size_limit) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisuint32_safe_deserialize(ptr0, len0, serialized_size_limit);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {bigint} serialized_size_limit
     * @returns {Uint8Array}
     */
    safe_serialize(serialized_size_limit) {
        const ret = wasm.fhisuint32_safe_serialize(this.__wbg_ptr, serialized_size_limit);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisuint32_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {FhisUint32} other
     * @returns {FhisUint32}
     */
    sub(other) {
        _assertClass(other, FhisUint32);
        const ret = wasm.fhisuint32_sub(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
    /**
     * @param {number} scalar
     * @returns {FhisUint32}
     */
    sub_scalar(scalar) {
        const ret = wasm.fhisuint32_sub_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint32.__wrap(ret[0]);
    }
}
if (Symbol.dispose) FhisUint32.prototype[Symbol.dispose] = FhisUint32.prototype.free;

export class FhisUint64 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(FhisUint64.prototype);
        obj.__wbg_ptr = ptr;
        FhisUint64Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FhisUint64Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fhisuint64_free(ptr, 0);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    add(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_add(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} scalar
     * @returns {FhisUint64}
     */
    add_scalar(scalar) {
        const ret = wasm.fhisuint64_add_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    bitand(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_bitand(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    bitor(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_bitor(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    bitxor(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_bitxor(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisClientKey} client_key
     * @returns {bigint}
     */
    decrypt(client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisuint64_decrypt(this.__wbg_ptr, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BigInt.asUintN(64, ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @returns {FhisUint64}
     */
    static deserialize(buffer) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisuint64_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} value
     * @param {FhisClientKey} client_key
     * @returns {FhisUint64}
     */
    static encrypt(value, client_key) {
        _assertClass(client_key, FhisClientKey);
        const ret = wasm.fhisuint64_encrypt(value, client_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} value
     * @returns {FhisUint64}
     */
    static encrypt_trivial(value) {
        const ret = wasm.fhisuint64_encrypt_trivial(value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} value
     * @param {FhisCompactPublicKey} public_key
     * @returns {FhisUint64}
     */
    static encrypt_with_public_key(value, public_key) {
        _assertClass(public_key, FhisCompactPublicKey);
        const ret = wasm.fhisuint64_encrypt_with_public_key(value, public_key.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    eq(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_eq(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    ge(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_ge(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    gt(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_gt(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    le(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_le(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    lt(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_lt(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    max(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_max(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    min(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_min(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    mul(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_mul(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} scalar
     * @returns {FhisUint64}
     */
    mul_scalar(scalar) {
        const ret = wasm.fhisuint64_mul_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisBool}
     */
    ne(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_ne(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisBool.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} buffer
     * @param {bigint} serialized_size_limit
     * @returns {FhisUint64}
     */
    static safe_deserialize(buffer, serialized_size_limit) {
        const ptr0 = passArray8ToWasm0(buffer, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.fhisuint64_safe_deserialize(ptr0, len0, serialized_size_limit);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} serialized_size_limit
     * @returns {Uint8Array}
     */
    safe_serialize(serialized_size_limit) {
        const ret = wasm.fhisuint64_safe_serialize(this.__wbg_ptr, serialized_size_limit);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.fhisuint64_serialize(this.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @param {FhisUint64} other
     * @returns {FhisUint64}
     */
    sub(other) {
        _assertClass(other, FhisUint64);
        const ret = wasm.fhisuint64_sub(this.__wbg_ptr, other.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
    /**
     * @param {bigint} scalar
     * @returns {FhisUint64}
     */
    sub_scalar(scalar) {
        const ret = wasm.fhisuint64_sub_scalar(this.__wbg_ptr, scalar);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return FhisUint64.__wrap(ret[0]);
    }
}
if (Symbol.dispose) FhisUint64.prototype[Symbol.dispose] = FhisUint64.prototype.free;

export function init_panic_hook() {
    wasm.init_panic_hook();
}

export function main() {
    wasm.main();
}

/**
 * @param {FhisServerKey} server_key
 */
export function set_server_key(server_key) {
    _assertClass(server_key, FhisServerKey);
    const ret = wasm.set_server_key(server_key.__wbg_ptr);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_2e59b1b37a9a34c3: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_is_function_49868bde5eb1e745: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_40c5a80572e8f9d3: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_b29b5c5a8065ba1a: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_c0cca72b82b86f4d: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_throw_81fc77679af83bc6: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_call_d578befcc3145dee: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_crypto_38df2bab126b63dc: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_getTime_f6ac312467f7cf09: function(arg0) {
            const ret = arg0.getTime();
            return ret;
        },
        __wbg_length_0c32cb8543c8e4c8: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_0_bfa2ef4bc447daa2: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_with_length_9cedd08484b73942: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_node_84ea875411254db1: function(arg0) {
            const ret = arg0.node;
            return ret;
        },
        __wbg_process_44c7a14e11e9f69e: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_prototypesetcall_3e05eb9545565046: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_require_b4edbdcf3e2a1ef0: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_a1248013d790bf5f: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_f2e0f995a21329ff: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_24f78b6d23f286ea: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_59fd959c540fe405: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_subarray_0f98d3fb634508ad: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_versions_276b2795b1c6a219: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./fhish_wasm_bg.js": import0,
    };
}

const FhisBoolFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisbool_free(ptr >>> 0, 1));
const FhisClientKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisclientkey_free(ptr >>> 0, 1));
const FhisCompactPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhiscompactpublickey_free(ptr >>> 0, 1));
const FhisCompressedServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhiscompressedserverkey_free(ptr >>> 0, 1));
const FhisConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisconfig_free(ptr >>> 0, 1));
const FhisPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhispublickey_free(ptr >>> 0, 1));
const FhisServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisserverkey_free(ptr >>> 0, 1));
const FhisShortintClientKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintclientkey_free(ptr >>> 0, 1));
const FhisShortintCompactCiphertextListFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintcompactciphertextlist_free(ptr >>> 0, 1));
const FhisShortintCompactPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintcompactpublickey_free(ptr >>> 0, 1));
const FhisShortintCompressedPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintcompressedpublickey_free(ptr >>> 0, 1));
const FhisShortintConfigFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintconfig_free(ptr >>> 0, 1));
const FhisShortintPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintpublickey_free(ptr >>> 0, 1));
const FhisShortintServerKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintserverkey_free(ptr >>> 0, 1));
const FhisShortintUint2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisshortintuint2_free(ptr >>> 0, 1));
const FhisUint32Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisuint32_free(ptr >>> 0, 1));
const FhisUint64Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fhisuint64_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('fhish_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
