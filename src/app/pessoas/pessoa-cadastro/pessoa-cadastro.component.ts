import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  titulo = null;

  constructor(
    private pessoaService: PessoaService,
    private erroHandle: ErrorHandlerService,
    private toasty: ToastyService,
    private navegation: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.carrecarPessoa(codigoPessoa);
    } else {
      this.atualizarTitulo();
    }

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  carrecarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
        .then(pessoa => {
          this.pessoa = pessoa;
          this.atualizarTitulo();
        })
        .catch(erro => this.erroHandle.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  private adicionar() {
    this.pessoaService.adicionar(this.pessoa)
        .then(() => {
          this.toasty.success('Pessoa adicionada com sucesso!');
          this.navegation.navigate(['/pessoas']);
        })
        .catch(erro => this.erroHandle.handle(erro));
  }

  private atualizar() {
    this.pessoaService.atualizar(this.pessoa)
    .then(() => {
      this.toasty.success('Pessoa alterada com sucesso!');
      this.navegation.navigate(['/pessoas']);
    })
    .catch(erro => this.erroHandle.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.navegation.navigate(['/pessoas/novo']);
  }

  private atualizarTitulo() {

    if (this.editando) {
     this.titulo = 'Editar Pessoa';
    } else {
      this.titulo = 'Nova Pessoa';
    }
  }

}
