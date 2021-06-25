// Extrenal imports
import { HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
// Internal imports
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  // Variable to store shortLink from api response
  public shortLink: string = "";
  public file: File = null; // Variable to store file
  public imageProgress: number = 0;

  // Inject service
  constructor(private fileUploadService: FileUploadService, private cdr: ChangeDetectorRef) { }

  // On file Select
  public onChange(event): void {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  public onUpload() {
    if (this.file) {
      this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.imageProgress = Math.round(event.loaded / event.total * 100);
          } else if (event.type === HttpEventType.Response) {
            // Short link via api response
            this.shortLink = event.body.link;
          }
          this.cdr.detectChanges();
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
