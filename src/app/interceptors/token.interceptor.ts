import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationHelper } from "../helpers/authentication.helper";
import { environment } from "src/environments/environment";

//mapear os endpoints que precisam de autorização
const endpoints = [
    environment.apiContatos + "/contatos",
    environment.apiContatos + "/dashboard"
];

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private authenticationHelper: AuthenticationHelper
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //verificando se a requisição é para um dos endpoints mapeados
        if (endpoints.some(item => req.url.includes(item))) {
            
            //capturar o token do usuário autenticado
            var accessToken = this.authenticationHelper.getData()?.accessToken;

            //adicionar o token na chamada da requisição
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        //liberando a requisição para ser executada..
        return next.handle(req);
    }
}