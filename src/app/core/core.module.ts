import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastyModule } from 'ng2-toasty';

import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { CategoriaService } from './../categoria/categoria.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  exports: [NavbarComponent, ToastyModule, ConfirmDialogModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService,
    Title,
    {provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class CoreModule { }
