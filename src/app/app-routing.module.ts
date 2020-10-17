import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent} from './login/login.component'
import { AuthenticateGuard } from './guards/authenticate.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {path : 'login', component: LoginComponent},

  {path : 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule) , canActivate: [AuthenticateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
