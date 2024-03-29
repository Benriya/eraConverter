import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCurrencyComponent } from './modify-currency.component';

describe('ModifyCurrencyComponent', () => {
  let component: ModifyCurrencyComponent;
  let fixture: ComponentFixture<ModifyCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
