import { IInjectedProviderNames } from '@chargerwallet/cross-inpage-provider-types';
import { ProviderBase, IInpageProviderConfig } from '@chargerwallet/cross-inpage-provider-core';
declare class ProviderBtcBase extends ProviderBase {
    constructor(props: IInpageProviderConfig);
    protected readonly providerName = IInjectedProviderNames.btc;
}
export { ProviderBtcBase };
