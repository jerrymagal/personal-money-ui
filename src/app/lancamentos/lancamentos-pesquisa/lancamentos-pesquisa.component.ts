import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  ngOnInit() {
  }

  constructor(
      private lancamentoService: LancamentoService,
      private toasty: ToastyService,
      private confirmation: ConfirmationService,
      private errorHandle: ErrorHandlerService
  )  {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total,
          this.lancamentos = resultado.lancamentos;
        })
        .catch(erro => this.errorHandle.handle(erro));
  }

  navergar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {

          if (this.grid.first === 0) {
            this.pesquisar(0);
          } else {
            this.grid.first = 0;
          }

          this.toasty.success('Lançamento excluido com sucesso!');
        })
        .catch(erro => this.errorHandle.handle(erro));
  }
}
