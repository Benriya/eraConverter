import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableCurrencyComponent } from './data-table-currency.component';

describe('DataTableCurrencyComponent', () => {
  let component: DataTableCurrencyComponent;
  let fixture: ComponentFixture<DataTableCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
