import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: 'file-upload', component: FileUploadComponent
  },
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' },
  { path: '**', redirectTo: '/file-upload', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
