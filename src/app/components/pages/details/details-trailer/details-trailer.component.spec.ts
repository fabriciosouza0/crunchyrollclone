import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrailerComponent } from './details-trailer.component';

describe('DetailsTrailerComponent', () => {
  let component: DetailsTrailerComponent;
  let fixture: ComponentFixture<DetailsTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTrailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
