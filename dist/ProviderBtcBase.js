import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase } from '@chargerwallet/cross-inpage-provider-core';
class ProviderBtcBase extends ProviderBase {
    constructor(props) {
        super(props);
        this.providerName = IInjectedProviderNames.btc;
    }
}
export { ProviderBtcBase };
