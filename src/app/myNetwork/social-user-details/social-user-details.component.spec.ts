import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialUserDetailsComponent } from './social-user-details.component';

describe('SocialUserDetailsComponent', () => {
  let component: SocialUserDetailsComponent;
  let fixture: ComponentFixture<SocialUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SocialUserDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocialUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
