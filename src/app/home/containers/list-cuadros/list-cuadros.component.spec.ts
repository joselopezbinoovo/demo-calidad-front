import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuadrosComponent } from './list-cuadros.component';

describe('ListCuadrosComponent', () => {
  let component: ListCuadrosComponent;
  let fixture: ComponentFixture<ListCuadrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCuadrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCuadrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
