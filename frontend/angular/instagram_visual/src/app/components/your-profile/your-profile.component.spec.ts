import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourProfileComponent } from './your-profile.component';

describe('YourProfileComponent', () => {
  let component: YourProfileComponent;
  let fixture: ComponentFixture<YourProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
