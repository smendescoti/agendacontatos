import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosPutRequest } from 'src/app/models/requests/contatos-put.request.model';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-editar-contatos',
  templateUrl: './editar-contatos.component.html',
  styleUrls: ['./editar-contatos.component.css']
})
export class EditarContatosComponent implements OnInit {

  //atributo
  mensagem: string = '';

  //método construtor
  constructor(
    private contatosService: ContatosService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
  }

  //método executado quando o componente é renderizado
  ngOnInit(): void {
    this.spinner.show();
    //capturando o parametro id enviado na URL da rota
    let idContato = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //executando a consulta do contato na API
    this.contatosService.getById(idContato)
      .subscribe({
        next: (data) => {
          //preenchendo os campos do formulário com
          //os dados do contato obtido na API
          this.formEdicao.patchValue(data);
          /*
          this.formEdicao.controls.idContato.setValue(data.idContato);
          this.formEdicao.controls.nome.setValue(data.nome);
          this.formEdicao.controls.telefone.setValue(data.telefone);
          this.formEdicao.controls.email.setValue(data.email);
          */
        },
        error: (e) => {
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

  //formulário para a página de edição
  formEdicao = new FormGroup({
    idContato: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(150)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required])
  });

  //função para capturar cada campo do formulário
  //e verificar se o mesmo está validado corretamente
  get form(): any {
    return this.formEdicao.controls;
  }

  //função para processar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    const request: ContatosPutRequest = {
      idContato: this.formEdicao.value.idContato as string,
      nome: this.formEdicao.value.nome as string,
      email: this.formEdicao.value.email as string,
      telefone: this.formEdicao.value.telefone as string
    };

    this.contatosService.put(request)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', atualizado com sucesso!`;
        },
        error: (e) => {
          this.mensagem = "Falha ao atualizar o contato";
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }
}
