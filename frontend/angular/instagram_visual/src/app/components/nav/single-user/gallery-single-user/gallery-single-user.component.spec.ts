import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySingleUserComponent } from './gallery-single-user.component';

describe('GallerySingleUserComponent', () => {
  let component: GallerySingleUserComponent;
  let fixture: ComponentFixture<GallerySingleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallerySingleUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallerySingleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
