import { TestBed } from '@angular/core/testing';

import { CrudsService } from './cruds.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CrudsService', () => {
  let service: CrudsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      providers: [
        HttpClient
      ],
    });
    service = TestBed.inject(CrudsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
