import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-modal-signature',
  templateUrl: './modal-signature.component.html',
  styleUrls: ['./modal-signature.component.scss']
})
export class ModalSignatureComponent implements OnInit {

  signaturePad: SignaturePad;
  @ViewChild('canvas') canvasEl: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ModalSignatureComponent>
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.dialogRef.close({imgBlob: base64Data})
  }

}
