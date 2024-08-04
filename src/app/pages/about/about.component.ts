import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TonConnectService } from '../../services/tonconnect.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {


  router = inject(Router)
  currentWallet: any = null;
  currentWalletInfo: any = null;
  currentAccount: any = null;
  currentIsConnectedStatus: boolean = false;


  constructor(private tonConnectService: TonConnectService) { }

  async ngOnInit() {
    const wallets = await this.tonConnectService.getWallets();
    console.log(wallets);

    const currentState = this.tonConnectService.getModalState();
    console.log(currentState);

    const unsubscribe = this.tonConnectService.onModalStateChange((state) => {
      console.log('Modal state changed:', state);
    });

  }
  ngAfterViewInit() {
    this.tonConnectService.initializeTonConnectUI();
    //this.updateCurrentStatus();
    this.subscribeToStatusChanges(); // Call the method to subscribe to status changes
  }

  async disconnect() {
    await this.tonConnectService.disconnect();
    this.router.navigate([''])
  }

  private subscribeToStatusChanges() {
    const unsubscribe = this.tonConnectService.onStatusChange(walletAndWalletInfo => {
      this.updateCurrentStatus();
    });
  }

  private updateCurrentStatus() {
    this.currentWallet = this.tonConnectService.getCurrentWallet();
    this.currentWalletInfo = this.tonConnectService.getCurrentWalletInfo();
    this.currentAccount = this.tonConnectService.getCurrentAccount();
    this.currentIsConnectedStatus = this.tonConnectService.isConnected();
    console.log(this.currentWalletInfo)
  }
}
