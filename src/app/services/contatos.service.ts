import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ContatosPostRequest } from "../models/requests/contatos-post.request.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ContatosGetResponse } from "../models/responses/contatos-get.response.model";
import { ContatosPutRequest } from "../models/requests/contatos-put.request.model";

@Injectable({
    providedIn: 'root'
})
export class ContatosService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    //POST /api/contatos
    post(contatosPostRequest: ContatosPostRequest): Observable<ContatosGetResponse> {
        return this.httpClient.post<ContatosGetResponse>
            (environment.apiContatos + "/contatos",
                contatosPostRequest);
    }

    //PUT /api/contatos
    put(contatosPutRequest: ContatosPutRequest): Observable<ContatosGetResponse> {
        return this.httpClient.put<ContatosGetResponse>
            (environment.apiContatos + "/contatos",
                contatosPutRequest);
    }

    //DELETE /api/contatos/{id}
    delete(idContato: string): Observable<ContatosGetResponse> {
        return this.httpClient.delete<ContatosGetResponse>
            (environment.apiContatos + "/contatos/" + idContato);
    }

    //GET /api/contatos
    getAll(): Observable<ContatosGetResponse[]> {
        return this.httpClient.get<ContatosGetResponse[]>
            (environment.apiContatos + "/contatos");
    }

    //GET /api/contatos/{idContato}
    getById(idContato: string): Observable<ContatosGetResponse> {
        return this.httpClient.get<ContatosGetResponse>
            (environment.apiContatos + "/contatos/" + idContato);
    }
}