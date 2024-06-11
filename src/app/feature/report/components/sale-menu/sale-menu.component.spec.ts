import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleMenuComponent } from './sale-menu.component';

describe('SaleMenuComponent', () => {
  let component: SaleMenuComponent;
  let fixture: ComponentFixture<SaleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
