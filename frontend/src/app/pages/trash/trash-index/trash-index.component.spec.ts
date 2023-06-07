import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashIndexComponent } from './trash-index.component';

describe('TrashIndexComponent', () => {
  let component: TrashIndexComponent;
  let fixture: ComponentFixture<TrashIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
