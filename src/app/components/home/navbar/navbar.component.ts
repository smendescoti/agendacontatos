import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationHelper } from 'src/app/helpers/authentication.helper';
import { AutenticarResponse } from 'src/app/models/responses/autenticar.response.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //atributo
  auth: AutenticarResponse | null = null;

  //método construtor
  constructor(
    private authenticationHelper: AuthenticationHelper,
    private spinner: NgxSpinnerService
  ) {
  }

  //método executado sempre antes do
  //componente ser carregado
  ngOnInit(): void {
    //capturar os dados do usuário autenticado, que está
    //gravado na local storage
    this.auth = this.authenticationHelper.getData();
  }

  //método para realizar o logout do usuário
  logout(): void {
    if (window.confirm('Deseja realmente sair do sistema?')) {
      this.spinner.show(); //exibindo o spinner
      this.authenticationHelper.signOut(); //apagar o conteudo da local storage
      window.location.href = '/'; //redirecionar para o raiz do projeto
    }
  }
}
