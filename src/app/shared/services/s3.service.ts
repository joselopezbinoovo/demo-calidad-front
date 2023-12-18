import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface S3FileInterface {

  id?: string;
  fileName: string;
  file: string;
  mime: string;
  size?: number;
  bucket: string;
  createdAt?: string;
  updatedAt?: string;
}

export class S3File implements S3FileInterface {

  id?: string;
  fileName: string;
  file: string;
  mime: string;
  size?: number;
  bucket: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;

  constructor(data?: S3FileInterface) {
    Object.assign(this, data);
  }
}



@Injectable({
  providedIn: 'root'
})
export class S3Service {

  bucket = environment.s3Bucket;
  config = {
    accessKeyId: environment.s3AccessKey,
    secretAccessKey: environment.s3SecretKey,
    endpoint: environment.s3EndPoint,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  };


  constructor() {}


  public s3uploadimage(file, filePath: string): Observable<S3File> {
    const result = new Subject<S3File>();
    const s3File = new S3File();

    s3File.fileName = file.nameCounter;
    s3File.mime = file.type;
    s3File.size = file.size;
    s3File.bucket = this.bucket;

    const client  = new S3(this.config);
    const objectRequest: S3.PutObjectRequest = {Key: filePath + s3File.fileName, Body: file, Bucket: this.bucket};
    const request = client.upload(objectRequest);

    request.send((err: AWS.AWSError, data: S3.ManagedUpload.SendData) => {
      if (err) {
        result.error(err);
        return;
      }
      s3File.file = data.Key;
      result.next(s3File);
    });

    return result.asObservable();
  }

  public s3getImg(s3File: S3File): Observable<S3.GetObjectOutput> {

    const result = new Subject<S3.GetObjectOutput>();
    const client = new S3(this.config);

    const request = client.getObject({ Bucket: s3File.bucket, Key: s3File.file  })

    request.send((error: AWS.AWSError, data: S3.GetObjectOutput) => {
      error ?  result.error(error) : result.next(data);
    });


    return result.asObservable();
  }

  public s3deleteFile(s3File: S3File): Observable<S3.DeleteObjectOutput> {
    const result = new Subject<S3.GetObjectOutput>();
    const client = new S3(this.config);
    const request = client.deleteObject( { Bucket: s3File.bucket, Key: s3File.file });

    request.send((error: AWS.AWSError, data: S3.DeleteObjectOutput) => {
      error ? result.error(error) : result.next(data);
    });
    return result.asObservable();
  }

}
