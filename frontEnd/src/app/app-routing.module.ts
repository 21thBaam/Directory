import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginRegistroComponent } from './components/login-registro/login-registro.component';
import { TestComponentComponent } from "./components/test-component/test-component.component";
import { FoldersComponent } from "./components/folders/folders.component";

import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginRegistroComponent,
    children: [
      { path: 'loginForm', component: LoginFormComponent},
      { path: 'registerForm', component: RegisterFormComponent}
    ]
  },
  {
    path: "test", component: TestComponentComponent, canActivate: [AuthGuard]
  },
  {
    path: "folders", component: FoldersComponent, canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
