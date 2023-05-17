import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TODOSAPPComponent } from './todos-app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// import { Component } from '@angular/core';
// import { CrudsService } from '../cruds.service';
// import { of } from 'rxjs';

describe('TODOSAPPComponent', () => {
  let component: TODOSAPPComponent;
  let fixture: ComponentFixture<TODOSAPPComponent>;
  // let crudsService;
  // let ToastrService;


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



//=======================DELETE TAST CASE
  // crudsService = jasmine.createSpyObj(['getItem' , 'AddItem' , 'editItem' , 'deleteItem']);
  // component =  new TODOSAPPComponent(crudsService ,ToastrService);
   

  // it("should display remove data", () => {
  //   let mockRespnoses = [
  //     {
  //       date: "2023-05-17T09:42:31.104Z",
  //       TaskItem: [
  //         {
  //           Checkbox: false,
  //           TaskName: "asaas"
  //         }
  //       ],
  //       TaskTitle: "asasas",
  //       id: 1
  //     }
  //   ];
  //     crudsService.deleteItem.and.returnValue(of(true));
  //     component.allList = mockRespnoses;
  //     component.deleteItem(mockRespnoses);
  //     expect(component.allList.length).toBe(1);
  // });

});
