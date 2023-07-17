export const enum EventId {
  ConnectWallet = 'connectWallet',
  IsWalletConnected = 'isWalletConnected',
  chainChanged = 'chainChanged',
  IsWalletDisconnected = "IsWalletDisconnected",
  EmitNewToken = "EmitNewToken",
  Paid = "Paid"
};

export type IType = 'button' | 'combobox';
