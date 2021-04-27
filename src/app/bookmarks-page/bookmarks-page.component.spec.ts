import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarksPageComponent } from './bookmarks-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '**',
    redirectTo: '/',
  },  
];

const mockSavedImgs = [
  {url:"test1.jpg",tags:"test"},
  {url:"test2.jpg",tags:"test"},
];

describe('BookmarksPageComponent', () => {
  let component: BookmarksPageComponent;
  let fixture: ComponentFixture<BookmarksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarksPageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarksPageComponent);
    component = fixture.componentInstance;
    component.images = [];    
    fixture.detectChanges();
  }); 

  it('should create', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    console.log(httpTestingController);
    expect(component).toBeTruthy();
  });

  // it("should update images on delete", () => {
  //   const JSONstr = JSON.stringify(mockSavedImgs);
  //   localStorage.setItem("imageFinder", JSONstr);
  //   component.updateImages();
  //   const jsonImages = JSON.stringify(component.images);
  //   expect(jsonImages).toEqual('[{"url":"test1.jpg","tags":"test"},{"url":"test2.jpg","tags":"test"}]');
  //   localStorage.clear();
  // });
});
