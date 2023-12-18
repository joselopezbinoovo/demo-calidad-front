
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Form, FormControllerService } from 'src/app/shared/modules/api-client';
import { S3File, S3Service } from 'src/app/shared/services/s3.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalImageComponent } from '../../components/modal-image/modal-image.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  id: string;
  index: string;
  images: Array<any>;
  selectAllImages: boolean = false;

  form: Form;
  etapa: string;

  constructor(
    private route: ActivatedRoute,
    private formControllerService: FormControllerService,
    private s3Service: S3Service,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
   // this.handleQueryParams();
    this.getImages();
  }

  handleQueryParams() {
    this.route.params.subscribe((res) => {

      this.id = res.id;
      this.index = res.index;

    });
    //this.getImages();
  }

  getImages() {
    this.handleQueryParams();
    this.formControllerService.formControllerFindById(this.id).subscribe((res) => {
      this.form = res;
      this.images = res.blocks[this.index].imagenes;
       this.etapa = res.blocks[this.index].name;
      this.images?.forEach(image => {
        image.name = image.fileName.split('.');
        this.showImg(image);
      });
    });
  }
  toggleSelectAllImages() {
    this.images.forEach(image => (image.selected = this.selectAllImages));
  }


  showImg(image: S3File) {
    this.s3Service.s3getImg(image).subscribe((res) => {
      const blobParts: any = res.Body;
      this.buildImage(image, blobParts, image.mime);
    });
  }

  buildImage(image: S3File, blobparts: any, mime: string) {
    const str = Buffer.from(blobparts).toString('base64');
    image.url = `data:${mime};base64,${str}`;
  }

/*   uploadImage(images) {

    this.formControllerService.formControllerFindById(this.id).subscribe((form) => {

      images.forEach(image => {
        image.createdAt = new Date();
        image.updatedAt = new Date();
        if(!form.blocks[this.index].imagenes){
          form.blocks[this.index].imagenes = []
        }
        form.blocks[this.index].imagenes.push(image)
        this.formControllerService.formControllerUpdateById(this.id, form).subscribe(() => {
          this.openSnackBar('Imagen subida con éxito');
          this.getImages();
        });
      })
    });
  } */

  uploadImage(images) {
    this.formControllerService.formControllerFindById(this.id).subscribe((form) => {
      // Agrega las imágenes al formulario
      form.blocks[this.index].imagenes = form.blocks[this.index].imagenes || [];
      images.forEach(image => {
        image.createdAt = new Date();
        image.updatedAt = new Date();
        form.blocks[this.index].imagenes.push(image);
      });

      // Actualiza el formulario con las imágenes agregadas
      this.formControllerService.formControllerUpdateById(this.id, form).subscribe(() => {
        this.openSnackBar('Imágenes subidas con éxito');
        this.getImages();  // o cualquier otra lógica necesaria después de la actualización
      });
    });
  }
/*En esta refactorización, primero agregamos todas las imágenes al arreglo imagenes en el formulario antes de realizar la actualización.
Esto garantiza que todas las imágenes se hayan agregado antes de realizar una única llamada al servicio de actualización.
Además, el código ahora maneja adecuadamente el caso en el que imagenes aún no exista en form.blocks[this.index].
Si no existe, se inicializa como un arreglo vacío antes de agregar las imágenes.
 */  makeFilePath(): string {
    const filepath = `${this.form?.serialNumber}/${this.etapa}/`;
    return filepath;
  }

  deleteImage(image: S3File, indice: number) {

    const dialog = this.dialog.open(DialogComponent, {
      data: {
        title: '¿Estas seguro que deseas eliminar la imagen?',
        type: 'delete'
      }
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.s3Service.s3deleteFile(image).subscribe(() => {
          this.images.splice(indice, 1);
          this.form.blocks[this.index].imagenes.forEach(element => {
            delete element.name;
            delete element.url;
          });
          this.formControllerService.formControllerUpdateById(this.id, this.form).subscribe(() => {
            this.getImages();
          });
        });
      }
    });
  }

  deleteSelectedImages() {
    const selectedImages = this.images.filter(image => image.selected);

    if (selectedImages.length === 0) {
      // No hay imágenes seleccionadas, puedes manejar esto según tus necesidades
      return;
    }

    const dialog = this.dialog.open(DialogComponent, {
      data: {
        title: '¿Estás seguro que deseas eliminar todas las imágenes seleccionadas?',
        type: 'delete',
      },
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        // Lógica para borrar las imágenes seleccionadas
        selectedImages.forEach((image, index) => {
          this.s3Service.s3deleteFile(image).subscribe(() => {
            // Elimina la imagen del array
            this.images = this.images.filter(img => img !== image);

            // Llamada al endpoint de la API para actualizar el formulario
            this.form.blocks[this.index].imagenes = this.form.blocks[this.index].imagenes
            .filter(element => element.selected !== true)
            .map(element => {
              // Elimina las propiedades 'name' y 'url'
              delete element.name;
              delete element.url;
              return element;
            });

            this.formControllerService.formControllerUpdateById(this.id, this.form).subscribe(() => {
              // La lógica de actualización puede variar según tus necesidades
              if (index === selectedImages.length - 1) {
                // Se ejecuta después de borrar la última imagen
                this.openSnackBar('Imágenes eliminadas con éxito');
                this.getImages(); // o cualquier otra lógica necesaria después de la actualización
              }
            });
          });
        });
      } else {
        this.getImages();
      }
    });
  }
  downloadImage(image: S3File) {
    this.s3Service.s3getImg(image).subscribe((res) => {
      const blobParts: any = res.Body;
      const mFile = new Blob([blobParts], { type: image.mime });
      const url = window.URL.createObjectURL(mFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = image.fileName;
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    });
  }

  goBack() {
    this.router.navigate(['form', this.id, 'view']);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 30000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: 'msgConfirm'
    });
  }

  zoomImg(image) {
    this.dialog.open(ModalImageComponent, {
      width: '800px',
      height: '700px',
      data: {
        image
      }
    });
  }

}
