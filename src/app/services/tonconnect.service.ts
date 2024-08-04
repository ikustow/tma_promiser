import { Injectable } from '@angular/core';
// Adjust the import statement to correctly import TonConnectUI
import { TonConnectUI } from '@tonconnect/ui';  // Ensure this matches the export type

@Injectable({
    providedIn: 'root'
})
export class TonConnectService {
    private tonConnectUI: any;

    constructor() { }

    initializeTonConnectUI() {
        // Check if TonConnectUI is a function and call it appropriately
        if (typeof TonConnectUI === 'function') {
            this.tonConnectUI = new TonConnectUI({
                manifestUrl: 'https://gist.githubusercontent.com/ikustow/cb642b537e3ea0fab51527a60a8a895a/raw/b78a6d3a27fd4ab15d902e907d293b0944280221/gistfile1.txt'

            });
        } else {
            console.error('TonConnectUI is not a constructable function or class');
        }
    }

    async getWallets() {
        if (this.tonConnectUI) {
            return this.tonConnectUI.getWallets();
        }
        return [];
    }

    async openModal() {
        if (this.tonConnectUI) {
            return this.tonConnectUI.openModal();
        }
    }

    closeModal() {
        if (this.tonConnectUI) {
            this.tonConnectUI.closeModal();
        }
    }

    getModalState() {
        return this.tonConnectUI ? this.tonConnectUI.modalState : null;
    }

    onModalStateChange(callback: (state: any) => void) {
        if (this.tonConnectUI) {
            return this.tonConnectUI.onModalStateChange(callback);
        }
        return () => { };
    }

    modalControl() {
        if (!this.tonConnectUI) {
            return null;
        }
        const { modal } = this.tonConnectUI;
        return {
            open: () => modal.open(),
            close: () => modal.close(),
            getState: () => modal.state,
            onStateChange: (callback: (state: any) => void) => modal.onStateChange(callback),
            unsubscribe: (unsubscribeFn: () => void) => unsubscribeFn()
        };
    }

    // New methods added below

    getCurrentWallet() {
        return this.tonConnectUI ? this.tonConnectUI.wallet : null;
    }

    getCurrentWalletInfo() {
        return this.tonConnectUI ? this.tonConnectUI.walletInfo : null;
    }

    getCurrentAccount() {
        return this.tonConnectUI ? this.tonConnectUI.account : null;
    }

    isConnected() {
        return this.tonConnectUI ? this.tonConnectUI.connected : false;
    }

    onStatusChange(callback: (walletAndWalletInfo: any) => void) {
        if (this.tonConnectUI) {
            return this.tonConnectUI.onStatusChange(callback);
        }
        return () => { };
    }

    async disconnect() {
        if (this.tonConnectUI) {
            return this.tonConnectUI.disconnect();
        }
    }

    async sendTransaction(transaction: any) {
        if (this.tonConnectUI) {
            return this.tonConnectUI.sendTransaction(transaction);
        } else {
            throw new Error('Wallet not connected');
        }
    }
}
