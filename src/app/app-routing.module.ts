import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// lazy loading 
const routes: Routes = [
  {
    path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule)
  }, {
    path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
