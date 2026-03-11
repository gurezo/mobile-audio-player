import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicAudioComponent } from './ionic-audio.component';

describe('IonicAudioComponent', () => {
  let component: IonicAudioComponent;
  let fixture: ComponentFixture<IonicAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IonicAudioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IonicAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
