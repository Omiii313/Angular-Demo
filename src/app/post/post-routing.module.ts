// Extrenal imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guard/auth.guard';
// Internal imports
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'index', canActivate: [AuthGuard], component: IndexComponent },
  { path: 'view/:postId', canActivate: [AuthGuard], component: ViewComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'edit/:postId', canActivate: [AuthGuard], component: EditComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: '**', redirectTo: '/index', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
