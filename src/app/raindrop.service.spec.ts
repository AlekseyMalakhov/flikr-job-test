import { TestBed } from '@angular/core/testing';
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
