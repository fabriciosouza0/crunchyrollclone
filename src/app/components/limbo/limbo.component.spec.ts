import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimboComponent } from './limbo.component';

describe('LimboComponent', () => {
  let component: LimboComponent;
  let fixture: ComponentFixture<LimboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimboComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
