import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalePromoComponent } from './sale-promo.component';

describe('SalePromoComponent', () => {
  let component: SalePromoComponent;
  let fixture: ComponentFixture<SalePromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalePromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalePromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
