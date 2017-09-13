import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    msg = 'Erro ao processar a solicitação. Tente novamente';

    console.log(errorResponse);

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;

      errors = errorResponse.json();
      msg = errors[0].mensagemUsuario;
    }

    this.toasty.error(msg);
  }

}
