/*
    Classe de modelo de dados para a 
    requisição do serviço PUT /contatos
*/
export class ContatosPutRequest {
    idContato: string = '';
    nome: string = '';
    email: string = '';
    telefone: string = '';
}