import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./guards/admin.guard";

import { LoginComponent } from "./components/home/login/login.component";
import { RegisterComponent } from "./components/home/register/register.component";
import { PasswordComponent } from "./components/home/password/password.component";
import { DashboardComponent } from "./components/admin/dashboard/dashboard.component";
import { CadastrarContatosComponent } from "./components/admin/cadastrar-contatos/cadastrar-contatos.component";
import { ConsultarContatosComponent } from "./components/admin/consultar-contatos/consultar-contatos.component";
import { EditarContatosComponent } from "./components/admin/editar-contatos/editar-contatos.component";

//Mapeamento de rotas de navegação para cada componente
const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'acessar-conta' }, /* rota raiz */
    { path: 'acessar-conta', component: LoginComponent },
    { path: 'criar-conta', component: RegisterComponent },
    { path: 'esqueci-minha-senha', component: PasswordComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'cadastrar-contatos', component: CadastrarContatosComponent, canActivate: [AdminGuard] },
    { path: 'consultar-contatos', component: ConsultarContatosComponent, canActivate: [AdminGuard] },
    { path: 'editar-contatos/:id', component: EditarContatosComponent, canActivate: [AdminGuard] }
];

//Criando uma classe para carregar as configurações
//Esta classe deverá ser inserida no arquivo /app.module.ts
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }