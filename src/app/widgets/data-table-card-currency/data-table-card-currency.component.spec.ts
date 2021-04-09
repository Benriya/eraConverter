import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCardCurrencyComponent } from './data-table-card-currency.component';

describe('DataTableCardCurrencyComponent', () => {
  let component: DataTableCardCurrencyComponent;
  let fixture: ComponentFixture<DataTableCardCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableCardCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCardCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
