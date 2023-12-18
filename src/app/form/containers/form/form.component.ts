import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Output } from '@angular/core';
import { MatHorizontalStepper } from '@angular/material/stepper';

import { ActivatedRoute, Router } from '@angular/router';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Form, FormBlock } from 'src/app/shared/modules/api-client/model/models';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { HeaderService, IHeaderParam } from 'src/app/shared/services/header.service';
import { FormService } from './form.service';
import { BlockStatus } from 'src/app/shared/enums';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MasterFormControllerService } from 'src/app/shared/modules/api-client';
import { NewMasterForm } from 'src/app/shared/modules/api-client/model/newMasterForm';
import { MatDialog } from '@angular/material/dialog';
import { ModalSelectLanguageComponent } from '../../components/modal-select-language/modal-select-language.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true }
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class FormComponent implements OnInit, OnDestroy {
  formId: string;
  file: any;
  selectedFormId: string;
  form: Form;
  blocks: FormBlock[];
  isEditable = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  blockIndex = 0;
  blockName: string;
  selectedIndex = 1;
  params: IHeaderParam[];
  blockStatus: string;
  finalY: number;
  status = '';
  masterForm: NewMasterForm;

  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  constructor(
    private service: FormService,
    private headerService: HeaderService,
    private route: ActivatedRoute,
    private router: Router,
    private masterFormControllerService: MasterFormControllerService,
    public dialog: MatDialog
  ) {
    this.selectedFormId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadAll();
    this.handleQueryParams();

  }

  handleQueryParams() {
    this.route.params.subscribe(param => {
      this.formId = param.id;
    });
  }

  loadAll() {
    // this.service.form$.subscribe(form => {
    //   if (!form) { return; }
    //   this.form = form;
    //   this.params = [{
    //     label: 'Pauta Inspección',
    //     value: this.form.blocks[0].name
    //   }];
    //   this.headerService.setParams(this.params);
    // });
    // this.service.loadForm(this.selectedFormId);
    this.service.getForm(this.selectedFormId).subscribe(form => {
      console.log(form)
      if (!form) { return; }
      this.form = form;
      this.getMasterForm(form.type);
      this.params = [{
        label: 'Pauta Inspección',
        value: this.form.blocks[0].name
      }];
      this.headerService.setParams(this.params);
    });
  }

  getMasterForm(type) {
    const filter = {
      where: {
        type: type
      }
    }
    this.masterFormControllerService.masterFormControllerFind(filter).subscribe((res: any) => {
      this.masterForm = res[0];
    })
  }

  getFormBlockStatus(selectedIndex: number): string {
    const status = this.service.getBlockStatus(selectedIndex);

    switch (status) {
      case BlockStatus.failure:
        return 'error';
      case BlockStatus.empty:
        return 'number';
      case BlockStatus.pending:
        return 'number';
      default:
        return 'done';
    }
  }

  blockChange(evt) {
    this.selectedIndex = evt.selectedIndex + 1;
    this.blockIndex = evt.selectedIndex;
    this.blockName = evt.selectedStep.stepControl;
    this.params[0].value = this.form.blocks[evt.selectedIndex].name;
  }

  goToImages() {
    this.router.navigate(['images', this.formId, this.blockIndex], { relativeTo: this.route });
  }

  goToConfig() {
    this.router.navigate(['config'], { relativeTo: this.route });
  }

  generatePDF() {
    const dialog = this.dialog.open(ModalSelectLanguageComponent, {
      width: '500px',
      height: '300px',
      panelClass: 'signatureModal',
      disableClose: true
    });
    dialog.afterClosed().subscribe((lang: string) => {
      const body = [];
      const foot = [];
      const blocks = this.form.blocks;
      if (lang !== 'ES') {
        let nameBlock = '';
        let nameInput = '';
        let descriptionInput = '';
        this.form.blocks.forEach((block: any) => {
          if (block.language) {
            block.language.forEach(l => {
              nameBlock = l[lang]
            })
          }
          body.push([
            { content: nameBlock, colSpan: 4, styles: { valign: 'middle', halign: 'center', cellPadding: 2, fillColor: [255, 159, 159] } }
          ]);
          foot.push({ content: nameBlock, });
          block?.inputs.forEach((input: any) => {
            if (input.language) {
              input.language.forEach(l => {
                nameInput = l[lang].name;
                descriptionInput = l[lang].description
              })
            }
            const b = [input?.checkpointId || 'No hay checkpoint', nameInput, descriptionInput, input.value || 'Sin valor'];
            body.push(b);
          });
        });
      } else {
        this.form.blocks.forEach((block) => {
          body.push([
            { content: block.name, colSpan: 4, styles: { valign: 'middle', halign: 'center', cellPadding: 2, fillColor: [255, 159, 159] } }
          ]);
          foot.push({ content: block.name, });
          block?.inputs.forEach(input => {
            const b = [input.checkpointId, input.name, String(input?.description) || 'No hay descripción', input?.value || 'Sin valor'];
            body.push(b);
          });
        });
      }
      const doc = new jsPDF();
      let finalY;
      const totalPagesExp = '{total_pages_count_string}';

      autoTable(doc, {
        startY: 65,
        tableWidth: 180,
        margin: { left: 15, top: 65 },
        body,
        bodyStyles: {
          fontSize: 8,
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 14.5 },
          1: { cellWidth: 65 },
          2: { cellWidth: 70 }
        },
        didDrawPage: (data) => {

          // Footer
          const str = `Página ${doc.getNumberOfPages()}`;

          if (typeof doc.putTotalPages === 'function') {
            str.concat(` de ${totalPagesExp}`);
          }
          doc.setFontSize(10);

          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 8);


          finalY = data.cursor.y;
          this.headerPDF(doc, lang);
        }
      });

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      const left = 15;
      let width = 0;
      let lastDate: string;

      for (let x = 0; x < blocks.length; x++) {

        if (x === 4) {
          width = 0;
          finalY += 25;
        }

        if (x + 1 === blocks.length) {
          lastDate = blocks[x].date;
        }
        doc.setDrawColor(0);
        doc.rect(left + width, finalY, 45, 8);
        doc.rect(left + width + 15, finalY + 13, 30, 6);
        doc.rect(left + width + 15, finalY + 19, 30, 6);

        doc.setFillColor(28, 68, 233);
        doc.rect(left + width, finalY + 8, 45, 5, 'FD');
        doc.rect(left + width, finalY + 13, 15, 6, 'FD');
        doc.rect(left + width, finalY + 19, 15, 6, 'FD');
        doc.setFontSize(9);
        doc.setTextColor(0);
        doc.text(blocks[x].name, left + width + 5, finalY + 5);
        doc.setFontSize(7);
        doc.setTextColor(255, 255, 255);
        doc.text('Inspeccionado por:', left + width + 8, finalY + 11);
        doc.text('NOMBRE:', left + width + 1, finalY + 17);
        doc.text('FECHA:', left + width + 2, finalY + 23);
        doc.setTextColor(0);
        doc.text(blocks[x].user || '0', left + width + 18, finalY + 17);
        doc.text(new Date(blocks[x].date).toLocaleDateString() || new Date().toLocaleDateString(), left + width + 18, finalY + 23);
        width += 45;
      }

      /* ------------   FIRMA  ---------------*/
      if (this.form.signature) {
        doc.addPage();
        this.headerPDF(doc, lang);
        doc.setDrawColor(0);
        doc.setFillColor(28, 68, 233);
        doc.rect(15, 65, 180, 10, 'FD');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('FIRMA', 16, 72);

        doc.setDrawColor(0);
        doc.rect(15, 75, 180, 40);
        doc.addImage(this.form?.signature, 'JPEG', 50, 75, 35, 35)
      }

      doc.output('dataurlnewwindow');
      doc.save(this.form.serialNumber + '-' + new Date(lastDate).toLocaleDateString())

    }, err => console.log(err));
  }

  headerPDF(doc, lang) {
    console.log(lang)
    autoTable(doc, {
      startY: 20.1,
      margin: {
        left: 15,
      },
      body: [[lang === 'ES' ? 'FORMATO' : 'FORMAT', this.masterForm.formato], [lang === 'ES' ? 'EDICIÓN' : 'EDITION', this.masterForm.edicion]],
      theme: 'grid',
      styles: {
        cellWidth: 30,
        lineColor: 0,
        fontSize: 8
      },
      bodyStyles: {
        fillColor: [255, 159, 159],
        textColor: 0,
      }
    });

    autoTable(doc, {
      startY: 57.5,
      margin: {
        left: 15
      },
      tableWidth: 180,
      head: [[
        { content: 'Nº', styles: { cellWidth: 14.5 } },
        { content: lang === 'ES' ? 'PUNTO DE INSPECCIÓN' : 'INSPECTION POINT', styles: { cellWidth: 65 } },
        { content: lang === 'ES' ? 'REQUISITO ACEPTACIÓN' : 'CONDITION ACCEPTANCE', styles: { cellWidth: 70 } },
        { content: lang === 'ES' ? 'VALOR' : 'VALUE', styles: { cellWidth: 30.5 } }
      ]],
      body: [],
      headStyles: {
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fillColor: [28, 68, 233],
        halign: 'center'
      },
    });

    // Rectangulos AZULES //
    doc.setDrawColor(0);
    doc.setFillColor(28, 68, 233);
    doc.rect(15, 10, 180, 10, 'FD');
    doc.rect(15, 33.5, 180, 10, 'FD');
    doc.rect(15, 43.5, 30, 7, 'FD');
    doc.rect(90, 43.5, 30, 7, 'FD');
    doc.rect(105, 50.5, 30, 7, 'FD');
    doc.rect(15, 50.5, 30, 7, 'FD');
    // FIN //

    // Rectangulos BLANCOS //
    doc.setDrawColor(0);
    doc.rect(75, 20.2, 120, 13.5);
    doc.rect(45, 43.5, 45, 7); // ESTE ES
    doc.rect(120, 43.5, 75, 7);
    doc.rect(45, 50.5, 60, 7);
    doc.rect(135, 50.5, 60, 7);
    // FIN //

    // TEXTOS //
    doc.setTextColor('#FFFFFF');
    doc.text('BINOOVO SMART INDUSTRY', 80, 17);

    doc.setTextColor(0);
    doc.setFontSize(9);
    doc.text(lang === 'ES' ? `TABLA INPECCIÓN Y ENSAYO PARA CUADROS` : 'INSPECTION AND TESTING TABLE FOR CABINET', 100, 26);
    doc.text(` ${this.form.type}`, 110, 30);
    doc.text(this.form.serialNumber, 48, 48);
    doc.text(this.form.salesOrder, 48, 55);
    doc.text(this.form.customer, 123, 48);
    doc.text(this.form.personInCharge, 138, 55);

    doc.setTextColor('#FFFFFF');
    doc.setFontSize(13);
    doc.text(lang === 'ES' ? 'DATOS GENERALES DEL PROYECTO' : 'GENERAL PROJECT DATA', 60, 40);

    doc.setFontSize(8);
    doc.text(lang === 'ES' ? 'CLIENTE' : 'CUSTOMER', 95, 48);
    doc.text(lang === 'ES' ? 'RESP. PROYECTO' : 'MANAGER', 108, 55);
    doc.text(lang === 'ES' ? 'Nº SERIE' : 'SERIAL Nº', 28, 48);
    doc.text(lang === 'ES' ? 'REF. PROYECTO' : 'PROJECT REF', 17, 55);
  }

  updateForm(evt) {
    this.form.blocks = evt.blocks;
  }

  ngOnDestroy() {
    this.headerService.clearParams();
  }

}
