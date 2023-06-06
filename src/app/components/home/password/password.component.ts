import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecuperarSenhaRequest } from 'src/app/models/requests/recuperar-senha.request.model';
import { RecuperarSenhaService } from 'src/app/services/recuperar-senha.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private recuperarSenhaService: RecuperarSenhaService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  //formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  //acessar os campos do formulário
  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  //função para capturar o SUBMIT
  onSubmit(): void {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.spinnerService.show();

    let recuperarSenhaRequest: RecuperarSenhaRequest = {
      email: this.formRecuperarSenha.value.email as string
    };

    this.recuperarSenhaService.post(recuperarSenhaRequest)
      .subscribe({
        next: (data) => {
          this.mensagemSucesso = `Recuperação de senha realizada com sucesso para o usuário: ${data.nome}`;
          this.formRecuperarSenha.reset();
        },
        error: (e) => {
          this.mensagemErro = e.error.message;
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

}
