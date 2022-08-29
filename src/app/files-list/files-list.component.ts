import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss']
})
export class FilesListComponent implements OnInit {

  cols: any =[
    {name: 'Key', displayName: 'File Name'},
    {name: 'Size', displayName: 'File Size'},
    {name: 'LastModifiedDate', displayName: 'Uploaded Time'},
  ]
  products:any =[
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
