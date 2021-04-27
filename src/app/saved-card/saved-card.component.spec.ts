import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCardComponent } from './saved-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: '/',
  },  
];

const mockImg = {
  url: "testURL",
  tags: ["tag1", "tag2"],
  _id: 25
};

describe('SavedCardComponent', () => {
  let component: SavedCardComponent;
  let fixture: ComponentFixture<SavedCardComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCardComponent);
    component = fixture.componentInstance;
    component.image = mockImg;
    component.index = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should delete image", () => {
    component.image = mockImg;
    const deleteButton = fixture.nativeElement.querySelector(".action button");
    deleteButton.click();
    const req = httpTestingController.expectOne('https://api.raindrop.io/rest/v1/raindrop/25');
    expect(req.request.method).toEqual('DELETE');

  });
});
