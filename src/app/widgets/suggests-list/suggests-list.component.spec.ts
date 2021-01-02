import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestsListComponent } from './suggests-list.component';

describe('SuggestsListComponent', () => {
  let component: SuggestsListComponent;
  let fixture: ComponentFixture<SuggestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
