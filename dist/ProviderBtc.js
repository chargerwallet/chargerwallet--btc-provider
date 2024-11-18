var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getOrCreateExtInjectedJsBridge } from '@chargerwallet/extension-bridge-injected';
import { web3Errors } from '@chargerwallet/cross-inpage-provider-errors';
import { ProviderBtcBase } from './ProviderBtcBase';
import { ProviderEvents, ProviderMethods, } from './types';
import { isWalletEventMethodMatch } from './utils';
class ProviderBtc extends ProviderBtcBase {
    constructor(props) {
        var _a;
        super(Object.assign(Object.assign({}, props), { bridge: props.bridge || getOrCreateExtInjectedJsBridge({ timeout: props.timeout }) }));
        this.isChargerWallet = true;
        this._selectedAddress = null;
        this._networkId = null;
        this._isConnected = false;
        this._initialized = false;
        this._isUnlocked = false;
        this._state = {
            accounts: null,
            isConnected: false,
            isUnlocked: false,
            initialized: false,
            isPermanentlyDisconnected: false,
            isBtcWalletProvider: false,
        };
        this._log = (_a = props.logger) !== null && _a !== void 0 ? _a : window.console;
        this.setMaxListeners(100);
        this._registerEvents();
        void this._initializeState();
    }
    _registerEvents() {
        window.addEventListener('chargerwallet_bridge_disconnect', () => {
            this._handleDisconnect();
        });
        this.on(ProviderEvents.MESSAGE_LOW_LEVEL, (payload) => {
            const { method, params } = payload;
            if (isWalletEventMethodMatch({
                method,
                name: ProviderEvents.ACCOUNTS_CHANGED,
            })) {
                this._handleAccountsChanged(params);
            }
            if (isWalletEventMethodMatch({ method, name: ProviderEvents.NETWORK_CHANGED })) {
                this._handleNetworkChanged(params);
            }
        });
    }
    _initializeState() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { networkId, accounts, isUnlocked } = yield this._request({
                    method: ProviderMethods.GET_PROVIDER_STATE,
                });
                if (isUnlocked) {
                    this._isUnlocked = true;
                    this._state.isUnlocked = true;
                }
                this.emit(ProviderEvents.CONNECT, {});
                this._handleNetworkChanged(networkId);
                this._handleAccountsChanged(accounts);
            }
            catch (error) {
                this._log.error('ChargerWallet: Failed to get initial state. Please report this bug.', error);
            }
            finally {
                this._initialized = true;
            }
        });
    }
    _emit(event, data) {
        if (this._initialized) {
            this.emit(event, data);
        }
    }
    _handleConnect(data) {
        if (!this._isConnected) {
            this._isConnected = true;
            this._state.isConnected = true;
            this._emit(ProviderEvents.CONNECT, data);
        }
    }
    _handleDisconnect() {
        this._isConnected = false;
        this._state.isConnected = false;
        this._state.accounts = null;
        this._selectedAddress = null;
        const disconnectError = web3Errors.provider.disconnected();
        this._emit(ProviderEvents.ACCOUNTS_CHANGED, []);
        this._emit(ProviderEvents.ACCOUNT_CHANGED, []);
        this._emit(ProviderEvents.DISCONNECT, disconnectError);
        this._emit(ProviderEvents.CLOSE, disconnectError);
    }
    _handleNetworkChanged(networkId) {
        this._handleConnect({});
        if (networkId !== this._networkId) {
            this._networkId = networkId;
            this._emit(ProviderEvents.NETWORK_CHANGED, networkId);
        }
    }
    _handleAccountsChanged(accounts) {
        if ((accounts === null || accounts === void 0 ? void 0 : accounts[0]) === this._selectedAddress) {
            return;
        }
        this._selectedAddress = accounts === null || accounts === void 0 ? void 0 : accounts[0];
        this._state.accounts = accounts;
        this._emit(ProviderEvents.ACCOUNTS_CHANGED, accounts);
        this._emit(ProviderEvents.ACCOUNT_CHANGED, accounts);
    }
    _request(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { method, params } = args;
            if (!method || typeof method !== 'string' || method.length === 0) {
                throw web3Errors.rpc.methodNotFound();
            }
            if (params !== undefined &&
                !Array.isArray(params) &&
                (typeof params !== 'object' || params === null)) {
                throw web3Errors.rpc.invalidParams();
            }
            const resp = yield this.bridgeRequest(args);
            return resp;
        });
    }
    // public methods
    requestAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.REQUEST_ACCOUNTS,
            });
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_ACCOUNTS,
            });
        });
    }
    getNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_NETWORK,
            });
        });
    }
    switchNetwork(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SWITCH_NETWORK,
                params: { network },
            });
        });
    }
    //https://docs.unisat.io/dev/unisat-developer-center/unisat-wallet/supported-chains
    getChain() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_CHAIN,
            });
        });
    }
    /**
     *
     * @param chain the chain. BITCOIN_MAINNET or BITCOIN_TESTNET or FRACTAL_BITCOIN_MAINNET
     * @returns
     */
    switchChain(chain) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SWITCH_CHAIN,
                params: { chain },
            });
        });
    }
    getPublicKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_PUBLIC_KEY,
            });
        });
    }
    getBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_BALANCE,
            });
        });
    }
    getInscriptions(cursor = 0, size = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.GET_INSCRIPTIONS,
                params: {
                    cursor,
                    size,
                },
            });
        });
    }
    sendBitcoin(toAddress, satoshis, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SEND_BITCOIN,
                params: {
                    toAddress,
                    satoshis,
                    feeRate: options === null || options === void 0 ? void 0 : options.feeRate,
                },
            });
        });
    }
    sendInscription(toAddress, inscriptionId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SEND_INSCRIPTION,
                params: {
                    toAddress,
                    inscriptionId,
                    feeRate: options === null || options === void 0 ? void 0 : options.feeRate,
                },
            });
        });
    }
    signMessage(message, type = 'ecdsa') {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SIGN_MESSAGE,
                params: {
                    message,
                    type,
                },
            });
        });
    }
    pushTx(rawTx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.PUSH_TX,
                params: {
                    rawTx,
                },
            });
        });
    }
    signPsbt(psbtHex, options = { autoFinalized: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SIGN_PSBT,
                params: {
                    psbtHex,
                    options,
                },
            });
        });
    }
    signPsbts(psbtHexs, options = { autoFinalized: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.SIGN_PSBTS,
                params: {
                    psbtHexs,
                    options,
                },
            });
        });
    }
    pushPsbt(psbtHex) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.PUSH_PSBT,
                params: {
                    psbtHex,
                },
            });
        });
    }
    inscribeTransfer(ticker, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._request({
                method: ProviderMethods.INSCRIBE_TRANSFER,
                params: {
                    ticker,
                    amount,
                },
            });
        });
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve('1.4.10');
        });
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    off(event, listener) {
        return super.off(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
}
export { ProviderBtc };
export { ProviderEvents, ProviderMethods, };
