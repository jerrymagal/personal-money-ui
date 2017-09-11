import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { LancamentosModule } from './lancamentos/lancamentos.module';
import { LancamentoService } from './lancamentos/lancamento.service';

import { PessoasModule } from './pessoas/pessoas.module';
import { PessoaService } from './pessoas/pessoa.service';

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
    HttpModule
  ],
  providers: [LancamentoService, PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
