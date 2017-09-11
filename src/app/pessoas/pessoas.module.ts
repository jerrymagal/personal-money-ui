import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { FormsModule } from '@angular/forms';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from './../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    InputMaskModule,
    TooltipModule,
    SharedModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ]
})
export class PessoasModule { }
