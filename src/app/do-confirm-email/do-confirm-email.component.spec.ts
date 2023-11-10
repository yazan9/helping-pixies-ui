import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoConfirmEmailComponent } from './do-confirm-email.component';

describe('DoConfirmEmailComponent', () => {
  let component: DoConfirmEmailComponent;
  let fixture: ComponentFixture<DoConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoConfirmEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
