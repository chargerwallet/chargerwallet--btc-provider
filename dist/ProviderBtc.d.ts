import { ProviderBtcBase } from './ProviderBtcBase';
import { IProviderBtc, ChargerWalletBtcProviderProps, RequestArguments, ProviderState, ProviderEvents, ProviderMethods, ProviderEventsMap, MessageType, BalanceInfo, InscriptionInfo, Chain } from './types';
declare class ProviderBtc extends ProviderBtcBase implements IProviderBtc {
    readonly isChargerWallet = true;
    _selectedAddress: string | null;
    _networkId: string | null;
    _isConnected: boolean;
    _initialized: boolean;
    _isUnlocked: boolean;
    _state: ProviderState;
    private readonly _log;
    constructor(props: ChargerWalletBtcProviderProps);
    private _registerEvents;
    private _initializeState;
    private _emit;
    private _handleConnect;
    private _handleDisconnect;
    private _handleNetworkChanged;
    private _handleAccountsChanged;
    protected _request<T>(args: RequestArguments): Promise<T>;
    requestAccounts(): Promise<string[]>;
    getAccounts(): Promise<string[]>;
    getNetwork(): Promise<string>;
    switchNetwork(network: string): Promise<void>;
    getChain(): Promise<Chain>;
    /**
     *
     * @param chain the chain. BITCOIN_MAINNET or BITCOIN_TESTNET or FRACTAL_BITCOIN_MAINNET
     * @returns
     */
    switchChain(chain: string): Promise<Chain>;
    getPublicKey(): Promise<string>;
    getBalance(): Promise<BalanceInfo | number>;
    getInscriptions(cursor?: number, size?: number): Promise<{
        total: number;
        list: InscriptionInfo[];
    }>;
    sendBitcoin(toAddress: string, satoshis: number, options?: {
        feeRate: number;
    }): Promise<string>;
    sendInscription(toAddress: string, inscriptionId: string, options?: {
        feeRate: number;
    }): Promise<string>;
    signMessage(message: string, type?: MessageType): Promise<string>;
    pushTx(rawTx: string): Promise<string>;
    signPsbt(psbtHex: string, options?: {
        autoFinalized: boolean;
    }): Promise<string>;
    signPsbts(psbtHexs: string[], options?: {
        autoFinalized: boolean;
    }): Promise<string[]>;
    pushPsbt(psbtHex: string): Promise<string>;
    inscribeTransfer(ticker: string, amount: string): Promise<string>;
    getVersion(): Promise<string>;
    on<E extends ProviderEvents>(event: E, listener: ProviderEventsMap[E]): this;
    off<E extends ProviderEvents>(event: E, listener: ProviderEventsMap[E]): this;
    emit<E extends ProviderEvents>(event: E, ...args: unknown[]): boolean;
}
export { ProviderBtc };
export { IProviderBtc, ProviderState, ProviderEvents, ProviderMethods, ProviderEventsMap, MessageType, BalanceInfo, InscriptionInfo, };
