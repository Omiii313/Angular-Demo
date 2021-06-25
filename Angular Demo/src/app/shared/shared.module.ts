import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
