/*
    Classe de modelo de dados para a 
    requisição do serviço POST /contatos
*/
export class ContatosPostRequest {
    nome: string = '';
    email: string = '';
    telefone: string = '';
}