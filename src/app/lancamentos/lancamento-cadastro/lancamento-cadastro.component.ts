import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from './../../core/model';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  pt_BR: any;

  tipos = [
    {label: 'Receita', value: 'RECEITA'},
    {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  titulo = null;
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private erroHangle: ErrorHandlerService,
    private route: ActivatedRoute,
    private navegation: Router
  ) { }

  ngOnInit() {
      this.pt_BR = {
        firstDayOfWeek: 0,
        dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
        dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
        dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
        monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                      'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
        monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
      };

      const codigoLancamento = this.route.snapshot.params['codigo'];

      if (codigoLancamento) {
        this.carregarLancamento(codigoLancamento);
      } else {
        this.atualizarTitulo();
      }

      this.carregarCategorias();
      this.carregarPessoas();
    }

    get editando() {
      return Boolean(this.lancamento.codigo);
    }

    carregarLancamento(codigo: number) {
      this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTitulo();
        })
        .catch(erro => this.erroHangle.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizar();
    } else {
      this.adicionar();
    }
  }

  private adicionar() {
    this.lancamentoService.adicionar(this.lancamento)
        .then(() => {
          this.toasty.success('Lançamento adicionado com sucesso!');
          this.navegation.navigate(['/lancamentos']);
        })
        .catch(erro => this.erroHangle.handle(erro));
  }

  private atualizar() {
    this.lancamentoService.atualizar(this.lancamento)
        .then(lancamento => {
          this.lancamento = lancamento;
          this.toasty.success('Lançamento editado com sucesso.');
        })
        .catch(erro => this.erroHangle.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.erroHangle.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({label: p.nome, value: p.codigo}));
      })
      .catch(erro => this.erroHangle.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.navegation.navigate(['/lancamentos/novo']);
  }

  private atualizarTitulo() {

    if (this.editando) {
      this.titulo = 'Editar Lançamento';
    } else {
      this.titulo = 'Novo Lançamento';
    }
  }
}
