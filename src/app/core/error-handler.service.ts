import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Erro ao processar a solicitação.';

      if (errorResponse.status === 403) {
        msg = 'Sem permissão para executar esta ação.';
      }

      try {
        errors = errorResponse.json();
        msg = errors[0].mensagemUsuario;
      } catch (e) {}

    } else {
      msg = 'Erro ao processar o envio. . Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
  }

}
