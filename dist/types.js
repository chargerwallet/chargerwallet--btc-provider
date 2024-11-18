export var ProviderEvents;
(function (ProviderEvents) {
    ProviderEvents["CONNECT"] = "connect";
    ProviderEvents["DISCONNECT"] = "disconnect";
    ProviderEvents["CLOSE"] = "close";
    ProviderEvents["ACCOUNTS_CHANGED"] = "accountsChanged";
    ProviderEvents["ACCOUNT_CHANGED"] = "accountChanged";
    ProviderEvents["NETWORK_CHANGED"] = "networkChanged";
    ProviderEvents["MESSAGE_LOW_LEVEL"] = "message_low_level";
})(ProviderEvents || (ProviderEvents = {}));
export var ProviderMethods;
(function (ProviderMethods) {
    ProviderMethods["REQUEST_ACCOUNTS"] = "requestAccounts";
    ProviderMethods["GET_ACCOUNTS"] = "getAccounts";
    ProviderMethods["GET_NETWORK"] = "getNetwork";
    ProviderMethods["SWITCH_NETWORK"] = "switchNetwork";
    ProviderMethods["GET_CHAIN"] = "getChain";
    ProviderMethods["SWITCH_CHAIN"] = "switchChain";
    ProviderMethods["GET_PUBLIC_KEY"] = "getPublicKey";
    ProviderMethods["GET_BALANCE"] = "getBalance";
    ProviderMethods["GET_INSCRIPTIONS"] = "getInscriptions";
    ProviderMethods["SEND_BITCOIN"] = "sendBitcoin";
    ProviderMethods["SEND_INSCRIPTION"] = "sendInscription";
    ProviderMethods["SIGN_MESSAGE"] = "signMessage";
    ProviderMethods["PUSH_TX"] = "pushTx";
    ProviderMethods["SIGN_PSBT"] = "signPsbt";
    ProviderMethods["SIGN_PSBTS"] = "signPsbts";
    ProviderMethods["PUSH_PSBT"] = "pushPsbt";
    ProviderMethods["GET_PROVIDER_STATE"] = "getProviderState";
    ProviderMethods["INSCRIBE_TRANSFER"] = "inscribeTransfer";
    /**
     * Add support for the Babylon BTC wallet provider.
     */
    ProviderMethods["GET_NETWORK_FEES"] = "getNetworkFees";
    ProviderMethods["GET_UTXOS"] = "getUtxos";
    ProviderMethods["GET_BTC_TIP_HEIGHT"] = "getBTCTipHeight";
})(ProviderMethods || (ProviderMethods = {}));
