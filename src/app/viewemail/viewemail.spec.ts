import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewemail } from './viewemail';

describe('Viewemail', () => {
  let component: Viewemail;
  let fixture: ComponentFixture<Viewemail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewemail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewemail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
