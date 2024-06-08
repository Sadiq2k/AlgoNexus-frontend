import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditModelComponent } from './video-edit-model.component';

describe('VideoEditModelComponent', () => {
  let component: VideoEditModelComponent;
  let fixture: ComponentFixture<VideoEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoEditModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
