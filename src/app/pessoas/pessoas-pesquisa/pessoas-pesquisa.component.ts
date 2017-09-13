import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  ngOnInit() {
  }

  constructor(
      private pessoaService: PessoaService,
      private toasty: ToastyService,
      private confirmation: ConfirmationService,
      private errorHandle: ErrorHandlerService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total;
          this.pessoas = resultado.pessoas;
    });
  }

  navegar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          if (this.grid.first === 0) {
            this.pesquisar(0);
          } else {
            this.grid.first = 0;
          }

          this.toasty.success('Pessoa excluida com sucesso');
        })
        .catch(erro => {
          this.errorHandle.handle(erro);
        });
  }

  mudarStatus(pessoa: any) {

    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'inativada';
        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => {
        this.errorHandle.handle(erro);
      });
  }
}
