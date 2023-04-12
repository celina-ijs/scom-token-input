import { Module, customModule, Container, VStack } from '@ijstech/components';
import ScomTokenInput from '@scom/scom-token-input'
@customModule
export default class Module1 extends Module {
    private picker1: ScomTokenInput;
    private picker2: ScomTokenInput;
    private mainStack: VStack;

    async init() {
        super.init();
        this.picker1 = new ScomTokenInput(undefined, {
            type: "combobox",
            title: 'Add funds',
            isBtnMaxShown: false,
            readonly: false,
            onSetMaxBalance: () => console.log('onSetMaxBalance'),
            onSelectToken: (token: any) => console.log('on select token', token)
        })
        this.mainStack.appendChild(this.picker1);

        this.picker2 = await ScomTokenInput.create({
            type: 'combobox',
            chainId: 43113,
            token: {
                "name": "OpenSwap",
                "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                "symbol": "OSWAP",
                "decimals": 18,
                "isCommon": true
            },
            onSelectToken: (token: any) => console.log('on select token', token)
        })
        this.mainStack.appendChild(this.picker2);
    }

    render() {
        return <i-panel>
            <i-hstack id="mainStack" margin={{top: '1rem', left: '1rem'}} gap="2rem">
                <i-scom-token-input
                    chainId={43113}
                    title="New title"
                    token={{
                        "name": "OpenSwap",
                        "address": "0x78d9D80E67bC80A11efbf84B7c8A65Da51a8EF3C",
                        "symbol": "OSWAP",
                        "decimals": 18,
                        "isCommon": true
                    }}
                ></i-scom-token-input>
            </i-hstack>
        </i-panel>
    }
}