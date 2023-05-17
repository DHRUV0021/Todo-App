import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TODOSAPPComponent } from './todos-app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('TODOSAPPComponent', () => {
  let component: TODOSAPPComponent;
  let fixture: ComponentFixture<TODOSAPPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TODOSAPPComponent ],
      imports:[
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers:[
        HttpClient,
        ToastrService
      ]
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
