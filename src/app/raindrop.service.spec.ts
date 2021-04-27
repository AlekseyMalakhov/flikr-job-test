import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: '/',
  },  
];

import { RaindropService } from './raindrop.service';

describe('RaindropService', () => {
  let service: RaindropService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    });
    service = TestBed.inject(RaindropService);
  });

  // it('should be created', () => {
  //   const httpClient = TestBed.inject(HttpClient);
  //   const httpTestingController = TestBed.inject(HttpTestingController);
  //   expect(service).toBeTruthy();
  // });
});
