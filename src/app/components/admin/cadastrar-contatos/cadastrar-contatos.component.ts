import { Component } from '@angular/core';
import { ContatosService } from 'src/app/services/contatos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContatosPostRequest } from 'src/app/models/requests/contatos-post.request.model';

@Component({
  selector: 'app-cadastrar-contatos',
  templateUrl: './cadastrar-contatos.component.html',
  styleUrls: ['./cadastrar-contatos.component.css']
})
export class CadastrarContatosComponent {

  mensagem: string = '';

  constructor(
    private contatosService: ContatosService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    
    this.spinnerService.show();

    const request: ContatosPostRequest = {
      nome: this.formCadastro.value.nome as string,
      email: this.formCadastro.value.email as string,
      telefone: this.formCadastro.value.telefone as string
    };

    this.contatosService.post(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', cadastrado com sucesso!`;
          this.formCadastro.reset();
        },
        error: (e) => {
          this.mensagem = "Falha ao cadastrar o contato";
          console.log(e.error);
        }
      }).add(() => {
        this.spinnerService.hide();
      })

  }
}
