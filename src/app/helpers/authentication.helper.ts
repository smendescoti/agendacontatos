import { Injectable } from "@angular/core";
import { AutenticarResponse } from "../models/responses/autenticar.response.model";
import { decryptData, encryptData } from "../utils/crypto.util";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationHelper {

    /*
        Método para salvar os dados do usuário
        autenticado na local storage
    */
    signIn(data: AutenticarResponse): void {

        //criptografar os dados que serão gravados na local storage
        let auth = JSON.stringify(data);
        let content = encryptData(auth, environment.chave_criptografia);

        //salvando na local storage
        localStorage.setItem('auth', content);
    }

    /*
        Método para verificar se o usuário
        está autenticado
    */
    isSignedIn(): boolean {

        //capturar os dados do usuário autenticado
        let auth = this.getData();

        //verificando se existem dados
        if(auth != null) {
            const dataAtual = new Date();
            const dataExpiracaoToken = new Date(auth.expiration as Date);
            //verificando se o token ainda é válido (não expirou!)
            return dataAtual <= dataExpiracaoToken;
        }

        return false;
    }

    /*
        Método para retornar os dados
        gravados na local storage
    */
    getData(): AutenticarResponse | null {

        //lendo e descriptografando os dados da local storage
        let data = localStorage.getItem('auth') as string;
        let content = decryptData(data, environment.chave_criptografia);

        if (content != null)
            return JSON.parse(content) as AutenticarResponse;
        else
            return null;
    }

    /*
        Método para apagar o conteudo
        da local storage
    */
    signOut(): void {
        localStorage.removeItem('auth');
    }
}