import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-select-language',
  templateUrl: './modal-select-language.component.html',
  styleUrls: ['./modal-select-language.component.scss']
})
export class ModalSelectLanguageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalSelectLanguageComponent>
  ) { }

  ngOnInit(): void {
  }

  selectedLanguage(language){
    this.dialogRef.close(language)
  }

}
