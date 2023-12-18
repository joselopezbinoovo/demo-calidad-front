import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TableColumnType } from 'src/app/shared/enums';
import { TableProperties } from 'src/app/shared/models';
import { S3Service } from 'src/app/shared/services/s3.service';
import { FormPartial, Form, FormBlock, FormInput, XBveEmpleados } from 'src/app/shared/modules/api-client/model/models';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormStates } from 'src/app/shared/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../containers/form/form.service';
import { ModalSignatureComponent } from '../modal-signature/modal-signature.component';
@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {

  @Input() index: number;
  storedType: string;
  storedUser: XBveEmpleados;
  form: Form;
  block: FormBlock;
  eventInput = new EventEmitter();
  genericTable: TableProperties;
  public dataSource: FormInput[];
  @Output() update = new EventEmitter

  constructor(
    private s3Service: S3Service,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private formService: FormService
  ) {
    this.dataSource = null;
  }

  ngOnInit() {
    this.storedUser = JSON.parse(localStorage.getItem('user'));
    this.storedType = localStorage.getItem('selectedFormType') || this.form?.type;
    // this.dataSource = Object.assign([], [...this.formService.formBlocks$.getValue()[this.index].inputs]);

    // this.form = this.formService.form$.getValue();
    // this.block = this.formService.formBlocks$.getValue()[this.index];
    this.formService.form$.subscribe(form => this.form = form);
    this.formService.formBlocks$.subscribe(blocks => {
      this.block = Object.assign({}, blocks[this.index]);
      this.dataSource = Object.assign([], [...this.block.inputs]);
    });

    this.genericTable = {
      displayedColumns: [
        'checkpointId', 'descriptionHeader', 'value', 'level', 'example'
      ],
      columnProperties: [
        {
          name: 'value',
          noSort: true,
          // getOptions: this.getResourcesOptions.bind(this),
          type: TableColumnType.select,
          isEditable: this.isCanEditable()
        },
        { name: 'checkpointId', noSort: true },
        { name: 'descriptionHeader', noSort: true },
        { name: 'level', noSort: true },
        { name: 'example', noSort: true, type: TableColumnType.image }
      ],
      properties: { select: 'select', image: 'image' },
      widthClass: true
    };
  }

  openModal(status: string) {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'EDICIÓN GUARDADA CORRECTAMENTE',
        type: 'success',
      },
      panelClass: 'dialogHome'
    });

    dialog.afterClosed().subscribe(() => {
      if (status === FormStates.finalizado) {
        this.router.navigate(['/home/list']);
        return;
      }
    });
  }

  eventTableClickHandler(event: any) {
    // console.log('OPTIONS ', event.record.options);
    // console.log('EVENTS ', event);
    // console.log('THIS BLOCK', this.index);

    const { event: newValue } = event;
    const blockIndex = this.index - 1;
    this.block.inputs[event.rowIndex].value = newValue;

    // this.dataSource[event.rowIndex].value = newValue;

    // // this.form.blocks[blockIndex].inputs[event.rowIndex].value = newValue;
    // this.block.inputs[event.rowIndex].value = newValue;

    /* console.log('Block', blockIndex);

    console.log(`FORM ----> ${this.form.blocks[this.index].inputs[event.rowIndex].checkpointId} -> ${this.form.blocks[this.index].inputs[event.rowIndex].value}`);
    console.log(`BLOCK ----> ${this.block.inputs[event.rowIndex].checkpointId} -> ${this.block.inputs[event.rowIndex].value}`);
    console.log('DATASOURCE ---> ', this.dataSource); */
  }


  filterKeyHandler(selectedKey: string[]) {
    let filter = {};

    if (selectedKey.length > 1) {
      const query = [];
      for (const key of selectedKey) {
        query.push({ key });
      }
      filter = { where: { or: query } };
    } else {
      filter = { where: { key: selectedKey[0] } };
    }
    return filter;
  }

  handlerGetImageBase64() {
    this.dataSource.map((data) => {
      if (data.example) {
        const file = {
          fileName: data.example,
          file: data.example,
          mime: 'image/jpg',
          bucket: 'calidad',
          size: 100
        };
        this.s3Service.s3getImg(file).subscribe((s3GetObjectOutput) => {
          const blobParts: any = s3GetObjectOutput.Body;
          const str = Buffer.from(blobParts).toString('base64');
          data.example = `data:${file.mime};base64,${str}`;
        },
          (error) => {
            console.log(error);
          },
        );
      }
    });
  }

  handlerSubmit() {
    const blocks = [...this.form.blocks.slice(0, this.index), this.block, ...this.form.blocks.slice(this.index + 1)];
    console.log(blocks)
    const body: FormPartial = {
      blocks
    };

    const all = this.block.inputs.every(b => b.value && b.value != 'NO OK')

    if (all === true) {
      this.block.status = FormStates.finalizado;
    }
    this.block.user = this.storedUser.x_name;
    this.block.date = new Date().toISOString();
    this.block.inputs.forEach(input => {
      delete input.descriptionHeader;
      if (!input.value) {
        this.block.status = FormStates.curso;
      }
    });

    /* const allBlockFinished = this.form.blocks.every(f => f.status === 'Finalizado')
    if (allBlockFinished === true) {
      body.status = FormStates.finalizado;
      body.endDate = new Date().toISOString()
    } */

    this.dataSource.forEach(input => {
      input.descriptionHeader = '<p class="nameInput">' + input.name + '</p>' + input.description;
    });


    this.formService.updateForm(this.form.id, body).subscribe((res) => {
      this.update.emit(body)
      this.openModal(body.status);
    })

  }

  finishForm() {
    const dialog = this.dialog.open(ModalSignatureComponent, {
      width: '550px',
      height: '400px',
      disableClose: true,
      panelClass: 'signatureModal'
    })

    dialog.afterClosed().subscribe((res: any) => {
      if(res){
        this.form.status = FormStates.finalizado;
        this.form.signature = res.imgBlob;
        this.form.endDate = new Date().toISOString();
        this.formService.updateForm(this.form.id, this.form).subscribe((res) => {
          this.update.emit(this.form)
          this.openModal(this.form.status);
        })
      }
    })
  }

  showFinish(): boolean {
    return this.form.blocks.every(f => f.status === 'Finalizado')
    /* return ['Pendiente Finalizar', 'Creado'].includes(this.form?.status) && this.form?.blocks.length === (this.index + 1); */
  }
  isCanEditable(): boolean {
    if (this.form?.status === 'Finalizado' && !this.hasPermissions()) {
      return false
    } else {
      return true
    }
  }

  cancelForm() {
    if (this.route.snapshot.params.state === 'edit') {
      this.router.navigate(['/home/list/cuadros']);
    } else {
      this.router.navigate(['/home/list']);
    }
  }
  hasPermissions(): boolean {
    const ls = JSON.parse(localStorage.getItem('user'));
    const department = ls.x_department_id;
    return [3, 31].includes(department) ? true : false
  }


}
