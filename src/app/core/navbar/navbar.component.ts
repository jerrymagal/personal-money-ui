import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OauthService } from './../../seguranca/oauth.service';
import { LogoutService } from './../../seguranca/logout.service';
import { ErrorHandlerService } from './../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth: OauthService,
    private logoutService: LogoutService,
    private erroHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(erro => this.erroHandler.handle(erro));
  }

}
