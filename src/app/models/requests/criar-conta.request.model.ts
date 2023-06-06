/*
    Classe de modelo de dados para a 
    requisição do serviço POST /criar-conta
*/
export class CriarContaRequest {
    nome: string = '';
    email: string = '';
    senha: string = '';
}