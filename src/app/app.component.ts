import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ LoginService } from './services/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PraticalTask';
  isLogin = false;
  constructor(
    private router: Router,
    private loginService: LoginService
    )
    {
      this.isLogin = this.loginService.isLogin();
    }

  logout() {
    this.loginService.logout();
  }
}
