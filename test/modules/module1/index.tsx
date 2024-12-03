import { Module, customModule, Container, VStack, application } from '@ijstech/components';
import { getMulticallInfoList } from '@scom/scom-multicall';
import { INetwork, Wallet } from '@ijstech/eth-wallet';
import getNetworkList from '@scom/scom-network-list';
import ScomTokenInput from '@scom/scom-token-input'
import { tokenStore } from '@scom/scom-token-list';
@customModule
export default class Module1 extends Module {
    private picker1: ScomTokenInput;
    private picker2: ScomTokenInput;
    private picker0: ScomTokenInput;
    private mainStack: VStack;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        const multicalls = getMulticallInfoList();
        const networkMap = this.getNetworkMap(options.infuraId);
        application.store = {
            infuraId: options.infuraId,
            multicalls,
            networkMap
        }
    }

    private getNetworkMap = (infuraId?: string) => {
        const networkMap = {};
        const defaultNetworkList: INetwork[] = getNetworkList();
        const defaultNetworkMap: Record<number, INetwork> = defaultNetworkList.reduce((acc, cur) => {
            acc[cur.chainId] = cur;
            return acc;
        }, {});
        for (const chainId in defaultNetworkMap) {
            const networkInfo = defaultNetworkMap[chainId];
            const explorerUrl = networkInfo.blockExplorerUrls && networkInfo.blockExplorerUrls.length ? networkInfo.blockExplorerUrls[0] : "";
            if (infuraId && networkInfo.rpcUrls && networkInfo.rpcUrls.length > 0) {
                for (let i = 0; i < networkInfo.rpcUrls.length; i++) {
                    networkInfo.rpcUrls[i] = networkInfo.rpcUrls[i].replace(/{INFURA_ID}/g, infuraId);
                }
            }
            networkMap[networkInfo.chainId] = {
                ...networkInfo,
                symbol: networkInfo.nativeCurrency?.symbol || "",
                explorerTxUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}tx/` : "",
                explorerAddressUrl: explorerUrl ? `${explorerUrl}${explorerUrl.endsWith("/") ? "" : "/"}address/` : ""
            }
        }
        return networkMap;
    }

    async init() {
        super.init();
        const clientWallet = Wallet.getClientInstance();
        const networkList: INetwork[] = Object.values(application.store?.networkMap || []);
        const instanceId = clientWallet.initRpcWallet({
            networks: networkList,
            defaultChainId: 43113,
            infuraId: application.store?.infuraId,
            multicalls: application.store?.multicalls
        });

        let wallet = Wallet.getClientInstance();
        let chainId = await wallet.getChainId();
        const tokenList = tokenStore.getTokenList(chainId);
        console.log("init", chainId, tokenList);
        
        this.picker0.tokenDataListProp = tokenList;

        this.picker1 = new ScomTokenInput(undefined, {
            type: "combobox",
            title: 'Add funds',
            isBtnMaxShown: false,
            onSetMaxBalance: () => console.log('onSetMaxBalance'),
            onSelectToken: (token: any) => console.log('on select token', token),
            tokenDataListProp: tokenList
        })
        this.mainStack.appendChild(this.picker1);

        this.picker2 = await ScomTokenInput.create({
            type: 'combobox',
            onSelectToken: (token: any) => console.log('on select token', token),
            tokenDataListProp: tokenList
        })
        this.mainStack.appendChild(this.picker2);

        this.picker0.token = {
            "chainId": 43113,
            "name": "OpenSwap",
            "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
            "symbol": "OSWAP",
            "decimals": 18,
            "isCommon": true
        }
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{ top: '1rem', left: '1rem' }} gap="2rem">
                <i-scom-token-input
                    id="picker0"
                    title="New title"
                ></i-scom-token-input>
            </i-hstack>
        </i-panel>
    }
}