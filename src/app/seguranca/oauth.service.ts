import { JwtHelper } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OauthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: Http, private jwtHelper: JwtHelper) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise()
        .then(response => {
          this.armazenarToken(response.json().access_token);
        })
        .catch(erro => {
          if (erro.status === 400) {

            if (erro.json().error === 'invalid_grant') {
                return Promise.reject('Usuário ou senha inválidos!');
            }
          }

          return Promise.reject(erro);
        });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
        .toPromise()
        .then(response => {
          this.armazenarToken(response.json().access_token);
          console.log('Token atualizado com sucesso');
          return Promise.resolve(null);
        })
        .catch(erro => {
          console.log('Erro ao atualizar o token', erro);
          return Promise.resolve(null);
        });
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
