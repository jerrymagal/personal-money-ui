import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  ngOnInit() {
  }

  constructor(private pessoaService: PessoaService) {}

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
}
