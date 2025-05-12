import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { EventType } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  @Input() path: string = '';
  selectedFile: File | null = null;
  percent!: number;
  http = inject(HttpClient);
  
  onFileSelected(event: any) {
    console.log('onFileSelected called:', event);
    if (event.target?.files.length > 0) {
      this.selectedFile = event.target.files[0];
      this.uploadFile();
    }
    console.log('selected file:', this.selectedFile?.name);
  }

  uploadFile() {
    if (!this.selectedFile) {
     return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
     this.http.post('http://localhost:3000/upload', formData, {
        reportProgress: true,
        observe: 'events',
      }).subscribe({
        next: (event: HttpEvent<any>) => {
          switch(event.type) {
            case HttpEventType.UploadProgress:
              this.percent= event.total? Math.round(100 * event.loaded / event.total) : 0;
              break;
            case HttpEventType.Response:
              console.log('request finished');
          }
          console.log('event:', event)
        }
      })
  }
}
