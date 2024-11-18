import { ProviderBtc } from "./ProviderBtc";
import { Fees, IProviderBtcWallet, ChargerWalletBtcProviderProps, UTXO, BalanceInfo } from "./types";
declare class ProviderBtcWallet extends ProviderBtc implements IProviderBtcWallet {
    constructor(props: ChargerWalletBtcProviderProps);
    connectWallet(): Promise<this>;
    signPsbt(psbtHex: string, options?: {
        autoFinalized: boolean;
        isBtcWalletProvider: boolean;
    }): Promise<string>;
    signPsbts(psbtHexs: string[], options?: {
        autoFinalized: boolean;
        isBtcWalletProvider: boolean;
    }): Promise<string[]>;
    getWalletProviderName(): Promise<string>;
    getAddress(): Promise<string>;
    getPublicKeyHex(): Promise<string>;
    getBalance(): Promise<BalanceInfo | number>;
    signMessageBIP322(message: string): Promise<string>;
    getNetworkFees(): Promise<Fees>;
    getUtxos(address: string, amount: number): Promise<UTXO[]>;
    getBTCTipHeight(): Promise<number>;
}
export { ProviderBtcWallet };
export { IProviderBtcWallet };
