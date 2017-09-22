import { Router } from '@angular/router';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { OauthService } from './../oauth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(
      private oauthService: OauthService,
      private errorHandler: ErrorHandlerService,
      private router: Router
  ) { }

  login(usuario: string, senha: string) {
    this.oauthService.login(usuario, senha)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
