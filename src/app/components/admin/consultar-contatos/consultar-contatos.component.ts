import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContatosGetResponse } from 'src/app/models/responses/contatos-get.response.model';
import { ContatosService } from 'src/app/services/contatos.service';

@Component({
  selector: 'app-consultar-contatos',
  templateUrl: './consultar-contatos.component.html',
  styleUrls: ['./consultar-contatos.component.css']
})
export class ConsultarContatosComponent implements OnInit {

  //atributos
  contatos: ContatosGetResponse[] = []; //lista de contatos exibida na consulta
  contato: ContatosGetResponse | null = null; //contato exibido na modal
  pagina: number = 1; //contador da paginação da consulta
  filtro: any = { nome: '' }; //filtro de pesquisa na consulta
  mensagem: string = ''; //exibir mensagens

  //método construtor
  constructor(
    private contatosService: ContatosService,
    private spinnerService: NgxSpinnerService
  ) {
  }

  /*
    Função executada no momento do
    carregamento do componente
  */
  ngOnInit(): void {
    this.spinnerService.show();
    this.contatosService.getAll()
      .subscribe({
        next: (data) => {
          this.contatos = data;
        },
        error: (e) => {
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

  /*
    Função para capturar e armazenar a página
    do componente ngx-pagination
  */
  pageChange(event: any): void {
    this.pagina = event;
  }

  /*
    Função para capturar um contato
    selecionado ao clicar no botão 'Excluir'
  */
  setContato(contato: ContatosGetResponse): void {
    this.contato = contato;
  }

  /*
    Função para realizar 
    a exclusão do contato
  */
  onDelete() : void {
    this.spinnerService.show();
    this.contatosService.delete(this.contato?.idContato as string)
      .subscribe({
        next: (data) => {
          this.mensagem = `Contato '${data.nome}', excluído com sucesso.`;
          this.ngOnInit(); //consultando os contatos
        },
        error: (e) => {
          this.mensagem = "Falha ao excluir o contato";
          console.log(e.error);
        }
      })
      .add(() => {
        this.spinnerService.hide();
      })
  }

}
