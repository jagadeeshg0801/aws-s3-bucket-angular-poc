import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  FOLDER: any = 'JG_1/';
  bucketName = 'jaga-bucket';
  private filesList$: any = new BehaviorSubject(null);
  constructor() { }
  bucket = new S3(
    {
      accessKeyId: 'AWS_YOUR_ACCES_KEY_ID',
      secretAccessKey: 'AWS_SECRET_KEY',
      region: 'us-east-1'
    }
  );
  uploadFile(file: any) {
    const contentType = file.type;

    const params = {
      Bucket: this.bucketName,
      Key: this.FOLDER + file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    this.bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }

  getFilesList(filePath: string): Observable<any> {
    let fileData: any = null;
    const params = {
      Bucket: this.bucketName,
      Prefix: filePath
    };

    this.bucket.listObjects(params, this.getFilesDataCallback);
    this.filesList$.next(fileData);
    return of(fileData)
  }

  getFiles(): Observable<any> {
    return this.filesList$
  }

  setFiles(data:any){
    this.filesList$.next(data)
  }

  getFilesDataCallback(err: any, data: any) {
    console.log(data, 'data')
    console.log(err, 'derr')
    let fileData = null;
    if (err) {
      console.log('There was an error getting your files: ' + err);
      fileData = null;
      // this.filesList$.next(null);
    }
    else {
      fileData = Object.assign({}, data);  
    }
    this.setFiles(fileData);
    console.log(data, 'data');    
    // this.filesList$.next(data);
    // data.Contents
  }


}
