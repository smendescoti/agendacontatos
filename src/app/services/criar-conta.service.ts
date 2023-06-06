import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CriarContaRequest } from "../models/requests/criar-conta.request.model";
import { CriarContaResponse } from "../models/responses/criar-conta.response.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CriarContaService {

    //método construtor
    constructor(
        //declarando um atributo na classe
        //fazendo a injeção de dependência deste atributo (inicialização)
        private httpClient: HttpClient
    ) {
    }

    //método para fazer a requisição POST do serviço /criar-conta
    post(criarContaRequest: CriarContaRequest): Observable<CriarContaResponse> {
        return this.httpClient.post<CriarContaResponse>(
            environment.apiContatos + '/criar-conta',
            criarContaRequest);
    }
}