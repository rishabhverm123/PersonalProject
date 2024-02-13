import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentCardComponent } from './modal-content-card.component';

describe('ModalContentCardComponent', () => {
  let component: ModalContentCardComponent;
  let fixture: ComponentFixture<ModalContentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalContentCardComponent]
    });
    fixture = TestBed.createComponent(ModalContentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
