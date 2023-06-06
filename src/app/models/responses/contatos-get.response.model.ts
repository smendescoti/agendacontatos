/*
    Modelo de dados para a consulta
    de contatos GET /api/contatos
*/
export class ContatosGetResponse {
    idContato: string = '';
    nome: string = '';
    email: string = '';
    telefone: string = '';
    dataCriacao: Date | null = null;
    idUsuario: string = '';
}