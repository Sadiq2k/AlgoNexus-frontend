import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyProblemsComponent } from './daily-problems.component';

describe('DailyProblemsComponent', () => {
  let component: DailyProblemsComponent;
  let fixture: ComponentFixture<DailyProblemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyProblemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
