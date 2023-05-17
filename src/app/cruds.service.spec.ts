import { TestBed } from '@angular/core/testing';
import { CrudsService } from './cruds.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';


describe('CrudsService', () => {
  let crudService: CrudsService;
  let mockHttpClient;


  beforeEach(() => {
    crudService = new CrudsService(mockHttpClient);
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        HttpClient,
      ],
    });
    crudService = TestBed.inject(CrudsService);
  });

  it('should be created', () => {
    expect(crudService).toBeTruthy();
  });

  //------------------TAST CASE WRITE STRAT
  it("should display task Title", () => {
    let mockRespnose = [
      {
        date: "2023-05-17T09:42:31.104Z",
        TaskItem: [
          {
            Checkbox: false,
            TaskName: "asaas"
          }
        ],
        TaskTitle: "asasas",
        id: 1
      }
    ];
    let response;
    spyOn(crudService,'getItem').and.returnValue(of(mockRespnose));
    crudService.getItem().subscribe(res => { response = res })
    expect(response).toEqual(mockRespnose);
  });
    //------------------TAST CASE WRITE END


});
