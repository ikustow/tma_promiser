import { Component } from '@angular/core';
import { LoginWalletButtonComponent } from "./login.wallet.button/login.wallet.button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginWalletButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
