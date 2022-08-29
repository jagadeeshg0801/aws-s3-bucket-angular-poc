import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedFiles: any;
  usersList:any =[
    {id: 'AD_1', label: 'Admin [Id: AD_1]'},
    {id: 'USER_1', label: 'Admin [Id: USER_1]'},
    {id: 'USER_2', label: 'Admin [Id: USER_2]'},
  ]

  constructor(private uploadService: UploadService) { }
  
  ngOnInit() {
    this.getFiles();
  }
  
  upload() {
  const file = this.selectedFiles.item(0);
  this.uploadService.uploadFile(file);
  }
  
  selectFile(event:any) {
  this.selectedFiles = event.target.files;
  }

  getFiles(){
    this.uploadService.getFilesList('/').subscribe((res)=>{
      console.log("list", res);
    })
  }
}