import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoaderComponent } from './main-loader.component';

describe('MainLoaderComponent', () => {
  let component: MainLoaderComponent;
  let fixture: ComponentFixture<MainLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLoaderComponent]
    });
    fixture = TestBed.createComponent(MainLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
