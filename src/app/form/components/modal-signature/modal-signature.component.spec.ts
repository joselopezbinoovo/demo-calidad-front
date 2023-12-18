import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSignatureComponent } from './modal-signature.component';

describe('ModalSignatureComponent', () => {
  let component: ModalSignatureComponent;
  let fixture: ComponentFixture<ModalSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
