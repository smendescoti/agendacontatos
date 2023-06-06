import { HttpClient } from "@angular/common/http";
import { RecuperarSenhaRequest } from "../models/requests/recuperar-senha.request.model";
import { Observable } from "rxjs";
import { RecuperarSenhaResponse } from "../models/responses/recuperar-senha.response.model";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RecuperarSenhaService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    //POST /api/recuperar-senha
    post(recuperarSenhaRequest: RecuperarSenhaRequest): Observable<RecuperarSenhaResponse> {
        return this.httpClient.post<RecuperarSenhaResponse>
            (environment.apiContatos + "/recuperar-senha",
                recuperarSenhaRequest);
    }
}