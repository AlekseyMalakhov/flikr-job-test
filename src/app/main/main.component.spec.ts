import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: '/',
  },  
];

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
