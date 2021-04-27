import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

const testBody = {
  code: "12345abc", 
  client_id: "6087cf2832de7c048515a1d9", 
  redirect_uri: "http://localhost:4200", 
  client_secret: "7f49bf67-8a67-47e5-918e-9c9523747655", 
  grant_type: "authorization_code"
}

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: '/',
  },  
];

import { RaindropService } from './raindrop.service';

describe('RaindropService', () => {
  let service: RaindropService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    });
    service = TestBed.inject(RaindropService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get token", () => {
    service.getToken("12345abc");
    const req = httpTestingController.expectOne('http://localhost:3000/get_token');    
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testBody);
    httpTestingController.verify();
  });
});
