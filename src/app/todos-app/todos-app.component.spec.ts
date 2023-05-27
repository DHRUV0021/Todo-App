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
  // let Datas;


  beforeEach(async () => {
    // Datas = [
    //   {
    //     tasks: [
    //       {
    //         id: 2,
    //         todoId: 50,
    //         isCompleted: false,
    //         name: "Create CRUD"
    //       },
    //       {
    //         id: 2,
    //         todoId: 50,
    //         isCompleted: true,
    //         name: "UI To-do List App"
    //       }
    //     ],
    //     addedon: "2023-05-16T04:45:50.470Z",
    //     name: "Work",
    //     id: 2
    //   }
    // ];

    //=======================DELETE TAST CASE
    // crudsService = jasmine.createSpyObj(['getItem', 'AddItem', 'editItem', 'deleteItem']);
    // component = new TODOSAPPComponent(crudsService, ToastrService);


    await TestBed.configureTestingModule({
      declarations: [TODOSAPPComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
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

  // it("should display remove data", () => {
  //   crudsService.deleteData.and.returnValue(of(true));
  //   component.getData = Datas;
  //   component.deleteData(Datas);
  //   expect(component.getData.length).toBe(2);
  // });



});
