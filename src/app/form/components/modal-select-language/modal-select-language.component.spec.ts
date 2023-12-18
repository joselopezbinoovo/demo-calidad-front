import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectLanguageComponent } from './modal-select-language.component';

describe('ModalSelectLanguageComponent', () => {
  let component: ModalSelectLanguageComponent;
  let fixture: ComponentFixture<ModalSelectLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelectLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelectLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
