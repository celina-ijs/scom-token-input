import { Module, customModule, Container, VStack } from '@ijstech/components';
import ScomTokenInput from '@scom/scom-token-input'
@customModule
export default class Module1 extends Module {
    private picker1: ScomTokenInput;
    private picker2: ScomTokenInput;
    private mainStack: VStack;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
        this.picker1 = new ScomTokenInput(undefined, {
            importable: true,
            chainId: 43113,
            token: {
                "name": "OpenSwap",
                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                "symbol": "OSWAP",
                "decimals": 18,
                "isCommon": true
            },
            isBtnMaxShown: true,
            isCommonShown: true
        })
        this.mainStack.appendChild(this.picker1);
        this.picker2 = new ScomTokenInput(undefined, {
            title: 'Add Funds',
            type: 'combobox'
        })
        this.mainStack.appendChild(this.picker2);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
                <i-scom-token-input></i-scom-token-input>
            </i-hstack>
        </i-panel>
    }
}