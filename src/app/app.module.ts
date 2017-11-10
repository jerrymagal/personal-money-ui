import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgIdleKeepaliveModule, Keepalive } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { GrowlModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRountingModule } from './app-routing.module';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { SegurancaModule } from './seguranca/seguranca.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    LancamentosModule,
    PessoasModule,
    HttpModule,
    SegurancaModule,
    AppRountingModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    GrowlModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
