"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderBtcWallet = void 0;
const extension_bridge_injected_1 = require("@chargerwallet/extension-bridge-injected");
const ProviderBtc_1 = require("./ProviderBtc");
const types_1 = require("./types");
// For Babylon method
class ProviderBtcWallet extends ProviderBtc_1.ProviderBtc {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { bridge: props.bridge ||
                (0, extension_bridge_injected_1.getOrCreateExtInjectedJsBridge)({ timeout: props.timeout }) }));
        this._state.isBtcWalletProvider = true;
    }
    connectWallet() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestAccounts();
            return this;
        });
    }
    signPsbt(psbtHex, options = {
        autoFinalized: true,
        isBtcWalletProvider: true,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: types_1.ProviderMethods.SIGN_PSBT,
                params: {
                    psbtHex,
                    options,
                },
            });
        });
    }
    signPsbts(psbtHexs, options = {
        autoFinalized: true,
        isBtcWalletProvider: true,
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: types_1.ProviderMethods.SIGN_PSBTS,
                params: {
                    psbtHexs,
                    options,
                },
            });
        });
    }
    getWalletProviderName() {
        this._state.isBtcWalletProvider = true;
        return Promise.resolve("ChargerWallet");
    }
    getAddress() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this._state.isBtcWalletProvider = true;
            const addresses = yield this.requestAccounts();
            return (_a = addresses === null || addresses === void 0 ? void 0 : addresses[0]) !== null && _a !== void 0 ? _a : 0;
        });
    }
    getPublicKeyHex() {
        return this.getPublicKey();
    }
    getBalance() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this._request({
                method: types_1.ProviderMethods.GET_BALANCE,
            }));
            return Number((_a = result === null || result === void 0 ? void 0 : result.confirmed) !== null && _a !== void 0 ? _a : 0);
        });
    }
    signMessageBIP322(message) {
        return this.signMessage(message, "bip322-simple");
    }
    getNetworkFees() {
        this._state.isBtcWalletProvider = true;
        return this._request({
            method: types_1.ProviderMethods.GET_NETWORK_FEES,
        });
    }
    getUtxos(address, amount) {
        return this._request({
            method: types_1.ProviderMethods.GET_UTXOS,
            params: {
                address,
                amount,
            },
        });
    }
    getBTCTipHeight() {
        return this._request({
            method: types_1.ProviderMethods.GET_BTC_TIP_HEIGHT,
            params: undefined,
        });
    }
}
exports.ProviderBtcWallet = ProviderBtcWallet;
