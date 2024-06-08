import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouresComponent } from './add-coures.component';

describe('AddCouresComponent', () => {
  let component: AddCouresComponent;
  let fixture: ComponentFixture<AddCouresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCouresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCouresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
