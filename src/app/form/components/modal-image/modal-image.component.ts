import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { S3Service } from 'src/app/shared/services/s3.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss']
})
export class ModalImageComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private s3Service: S3Service
  ) { }

  ngOnInit(): void {
  }

  getImage(){
    this.s3Service.s3getImg(this.data.image).subscribe((image) => {
      const blobParts: any = image.Body;
      this.buildImage(blobParts, this.data.image.mime);
    });
  }

  buildImage(blobparts: any, mime: string) {
    const str = Buffer.from(blobparts).toString('base64');
    this.data.image.url = `data:${mime};base64,${str}`;
  }  

}
