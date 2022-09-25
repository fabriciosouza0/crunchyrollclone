import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGeneralComponent } from './details-general.component';

describe('DetailsGeneralComponent', () => {
  let component: DetailsGeneralComponent;
  let fixture: ComponentFixture<DetailsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
