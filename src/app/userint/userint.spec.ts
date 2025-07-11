import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userint } from './userint';

describe('Userint', () => {
  let component: Userint;
  let fixture: ComponentFixture<Userint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userint);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
