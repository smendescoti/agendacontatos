import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';
import { AutenticarRequest } from 'src/app/models/requests/autenticar.request.model';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //atributos
  mensagemErro: string = '';

  //construtor
  constructor(
    private autenticarService: AutenticarService,
    private authenticationHelper: AuthenticationHelper,
    private spinnerService: NgxSpinnerService
  ) {
  }

  //estrutura do formulário
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para acessarmos os estados dos campos do formulário
  get form(): any {
    return this.formLogin.controls;
  }

  //função para capturar o Submit do formulário
  onSubmit(): void {

    this.spinnerService.show();

    let autenticarRequest: AutenticarRequest = {
      email: this.formLogin.value.email as string,
      senha: this.formLogin.value.senha as string
    };

    this.autenticarService.post(autenticarRequest)
      .subscribe({
        next: (response) => {
          //salvar os dados do usuário  autenticado na localstorage
          this.authenticationHelper.signIn(response);
          //redirecionar para a página /dashboard
          window.location.href = '/dashboard';
        },
        error: (e) => {
          switch (e.status) {
            case 401:
              this.mensagemErro = e.error.message;
              break;
            default:
              this.mensagemErro = 'Falha ao realizar autenticação.';
              break;
          }
        }
      }).add(() => {
        this.spinnerService.hide();
      });
  }
}
