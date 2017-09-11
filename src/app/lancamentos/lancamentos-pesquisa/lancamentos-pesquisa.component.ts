import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, LOCALE_ID, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css'],
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}]
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  ngOnInit() {
  }

  constructor(private lancamentoService: LancamentoService) {}

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.total,
          this.lancamentos = resultado.lancamentos;
        });
  }

  navergar(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {

          if (this.grid.first === 0) {
            this.pesquisar(0);
          } else {
            this.grid.first = 0;
          }
        });
  }
}
