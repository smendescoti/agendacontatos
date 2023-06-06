import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutenticarRequest } from "../models/requests/autenticar.request.model";
import { AutenticarResponse } from "../models/responses/autenticar.response.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AutenticarService {

    constructor(
        private httpClient: HttpClient
    ) {
    }

    post(autenticarRequest: AutenticarRequest): Observable<AutenticarResponse> {
        return this.httpClient.post<AutenticarResponse>
            (environment.apiContatos + "/autenticar",
                autenticarRequest);
    }
}