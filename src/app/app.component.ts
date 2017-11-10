import { OauthService } from './seguranca/oauth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastyConfig } from 'ng2-toasty';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  idleState = 'Not started';
  timedOut = false;
  lastPing?: Date = null;
  msgs: Message[] = [];

  constructor(
    private toastyConfig: ToastyConfig,
    private router: Router,
    private idle: Idle,
    private keepalive: Keepalive,
    private oauth: OauthService
  ) {
      this.toastyConfig.theme = 'bootstrap';
      this.toastyConfig.position = 'top-right';

      // sets an idle timeout of 5 seconds, for testing purposes.
      idle.setIdle(10);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(4);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => {
        this.oauth.obterNovoAccessToken();
        this.msgs[0].detail = 'Sessão renovada!';
      });

      idle.onTimeout.subscribe(() => {
        this.msgs[0].detail = 'Sua sessão expirou!';
        this.timedOut = true;
        this.router.navigate(['/login']);
      });

      idle.onTimeoutWarning.subscribe((countdown) => {
        this.carregarMensagemAvisoSessao(countdown);
      });

      keepalive.interval(15);
      keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.reset();
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false;
    this.msgs = [];
  }

  private carregarMensagemAvisoSessao(tempo) {
    if (this.msgs.length < 1) {
      this.msgs.push({ severity: 'warn', summary: 'Aviso', detail: 'Sua sessão finalizara em ' + tempo + ' segundos!' });
    } else {
      this.msgs[0].detail = 'Sua sessão finalizara em ' + tempo + ' segundos!';
    }
  }

}
