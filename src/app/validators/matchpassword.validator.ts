import { AbstractControl } from '@angular/forms';

//declarando uma classe para validação dos campos
export class MatchPasswordValidator {

    //método para realizar a validação dos campos
    static matchPassword(abstractControl: AbstractControl) {

        //capturar o valor preenchido no campo 'senha' do formulário
        let senha = abstractControl.get('senha')?.value;
        //capturar o valor preenchido no campo 'senhaConfirmacao' do formulário
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        //verificando se os campos estão preenchidos
        //com valores diferentes..
        if (senhaConfirmacao.length > 0 && senha != senhaConfirmacao) {
            //gerando um erro de validação
            abstractControl.get('senhaConfirmacao')?.setErrors({
                //nome do erro de validação 'matchPassword'
                matchPassword: true
            });
        }

        return null;
    }
}