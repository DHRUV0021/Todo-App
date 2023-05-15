import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOSAPPComponent } from './todos-app.component';

describe('TODOSAPPComponent', () => {
  let component: TODOSAPPComponent;
  let fixture: ComponentFixture<TODOSAPPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TODOSAPPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TODOSAPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
