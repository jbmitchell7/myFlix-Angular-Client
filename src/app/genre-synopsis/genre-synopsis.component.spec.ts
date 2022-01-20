import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreSynopsisComponent } from './genre-synopsis.component';

describe('GenreSynopsisComponent', () => {
  let component: GenreSynopsisComponent;
  let fixture: ComponentFixture<GenreSynopsisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreSynopsisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSynopsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
