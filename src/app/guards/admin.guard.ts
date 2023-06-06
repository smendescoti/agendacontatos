import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationHelper } from "../helpers/authentication.helper";

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    //método construtor
    constructor(
        private authenticationHelper: AuthenticationHelper,
        private router: Router
    ) {
    }

    //método para verificar se a rota
    //pode ser acessada ou não
    canActivate() {
        //verificar se o usuário está autenticado
        if (this.authenticationHelper.isSignedIn()) {
            //a rota poderá ser acessada!
            return true;
        }
        else {
            //trocar a rota para a página de login
            this.router.navigate(['/acessar-conta']);
            return false;
        }
    }
}