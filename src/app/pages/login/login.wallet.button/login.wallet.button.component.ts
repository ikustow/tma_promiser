import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { TonConnectService } from '../../../services/tonconnect.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-wallet-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.wallet.button.component.html',
  styleUrl: './login.wallet.button.component.scss'
})

export class LoginWalletButtonComponent implements OnInit, AfterViewInit {

  currentIsConnectedStatus: boolean = false;

  router = inject(Router)

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
    this.updateCurrentStatus();
    this.subscribeToStatusChanges(); // Call the method to subscribe to status changes
  }

  async openModal() {
    await this.tonConnectService.openModal();
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
    this.currentIsConnectedStatus = this.tonConnectService.isConnected();
    if (this.currentIsConnectedStatus == true) {
      this.router.navigate(['\about'])
    }
  }

}



