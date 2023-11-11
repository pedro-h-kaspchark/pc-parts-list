import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/Parts/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./view/Parts/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'detalhar',
    loadChildren: () => import('./view/Parts/detalhar/detalhar.module').then( m => m.DetalharPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./view/user/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./view/user/register/register.module').then( m => m.RegisterPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }