import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CriarContaRequest } from 'src/app/models/requests/criar-conta.request.model';
import { CriarContaService } from 'src/app/services/criar-conta.service';
import { MatchPasswordValidator } from 'src/app/validators/matchpassword.validator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //construtor
  constructor(
    //declarando os atributos para injeção de dependência (inicialização)
    private criarContaService: CriarContaService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  //Estrutura do formulário
  formRegister = new FormGroup({
    //campo 'nome':
    nome: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-ZÀ-Üà-ü\s]{8,100}$/)
    ]),
    //campo 'email':
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    //campo 'senha':
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_+\-=])[a-zA-Z\d!@#$%&*_+\-=]{8,}$/)
    ]),
    //campo 'senha confirmação'
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: [
      //adicionando o validador para comparação das senhas
      MatchPasswordValidator.matchPassword
    ]
  });

  //função auxiliar para exibir os erros de validação
  //de cada campo (FormControl) do formulário
  get form(): any {
    return this.formRegister.controls;
  }

  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    //exibindo o spinner
    this.spinnerService.show();

    //criar um objeto contendo os dados que serão
    //enviados para o serviço de criação de conta
    let criarContaRequest: CriarContaRequest = {
      nome: this.formRegister.value.nome as string,
      email: this.formRegister.value.email as string,
      senha: this.formRegister.value.senha as string
    };

    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //executando a chamada para o serviço
    this.criarContaService.post(criarContaRequest)
      .subscribe({
        //bloco que captura o retorno de sucesso
        next: (response) => {
          //exibir mensagem na página
          this.mensagemSucesso = `Parabéns ${response.nome}, sua conta foi criada com sucesso.`;
          //limpar o formulário
          this.formRegister.reset();
        },
        //bloco que captura o retorno de erro
        error: (e) => {
          switch (e.status) {
            case 422:
              this.mensagemErro = e.error.message;
              break;
            default:
              this.mensagemErro = 'Falha ao cadastrar conta do usuário.';
              break;
          }
        }
      }).add(() => {
        this.spinnerService.hide();
      });

  }
}
