import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderInlineComponent } from './slider-inline.component';

describe('SliderInlineComponent', () => {
  let component: SliderInlineComponent;
  let fixture: ComponentFixture<SliderInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderInlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
