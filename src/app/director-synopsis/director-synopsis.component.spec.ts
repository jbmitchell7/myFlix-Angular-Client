import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorSynopsisComponent } from './director-synopsis.component';

describe('DirectorSynopsisComponent', () => {
  let component: DirectorSynopsisComponent;
  let fixture: ComponentFixture<DirectorSynopsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorSynopsisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
