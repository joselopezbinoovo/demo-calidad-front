import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CounterControllerService } from '../../modules/api-client';

import { S3File, S3Service } from '../../services/s3.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Input() file: S3File;
  @Input() data: any;
  @Input() title: string;
  @Input() serialNumber: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onUploadStart: EventEmitter<null> = new EventEmitter<null>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onUpload: EventEmitter<any[]> = new EventEmitter<any[]>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteStart: EventEmitter<S3File> = new EventEmitter<S3File>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDelete: EventEmitter<S3File> = new EventEmitter<S3File>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDownloadStart: EventEmitter<S3File> = new EventEmitter<S3File>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onError: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDownload: EventEmitter<S3File> = new EventEmitter<S3File>();

  contador: number;

  constructor(
    private s3Service: S3Service,
    private counterControllerService: CounterControllerService
  ) { }

  ngOnInit(): void {
  }

  async handleFileSelect(evt) {

    const files = Object.values(evt.target.files);
    const imagenes = [];
    this.counterControllerService.counterControllerGetNextCounterSequence(this.serialNumber).subscribe((counter) => {
      files.forEach(async (file: any, index) => {
        this.onUploadStart.emit();
        const filePath = (this.data) ? this.data : `Bloque1/`;
        this.contador = counter;
        const indexTypeImage = file.name.lastIndexOf('.') +1
        const typeImage = file.name.substring(indexTypeImage)
        file.nameCounter = `${this.serialNumber}-${counter + index + 1}.${typeImage}`;
        this.s3Service.s3uploadimage(file, filePath).subscribe((s3File: S3File) => {
          this.file = s3File;
          this.file.fileName = `${this.serialNumber} - ${counter + index + 1}`;
          imagenes.push(s3File)
          if (files.length === index + 1) {
            this.onUpload.emit(imagenes);
          };
        });
      });
      this.counterControllerService.counterControllerUpdateById(this.serialNumber, {sequence: counter + files.length}).subscribe()
    }, err => console.log(err));
  }

}
