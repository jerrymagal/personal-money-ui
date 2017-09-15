import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { LancamentoService } from './../lancamento.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { CategoriaService } from './../../categoria/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Lancamento } from './../../core/model';
import { ActivatedRoute } from '@angular/router';

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
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private erroHangle: ErrorHandlerService,
    private route: ActivatedRoute
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
        })
        .catch(erro => this.erroHangle.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  private adicionar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
        .then(() => {
          this.toasty.success('Lançamento adicionado com sucesso!');
          form.reset();
          this.lancamento = new Lancamento();
        })
        .catch(erro => this.erroHangle.handle(erro));
  }

  private atualizar(form: FormControl) {
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
}
