import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedCardComponent } from './saved-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockImg = {
  url: "testURL",
  tags: "test tags"
};

const mockSavedImgs = [
  {url:"test1.jpg",tags:"test"},
  {url:"test2.jpg",tags:"test"},
  {url:"test3.jpg",tags:"test"},
];

describe('SavedCardComponent', () => {
  let component: SavedCardComponent;
  let fixture: ComponentFixture<SavedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
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
    localStorage.clear();
    const JSONstr = JSON.stringify(mockSavedImgs);
    localStorage.setItem("imageFinder", JSONstr);
    const deleteButton = fixture.nativeElement.querySelector(".action button");
    deleteButton.click();
    const bookmarks = localStorage.getItem("imageFinder");
    expect(bookmarks).toEqual('[{"url":"test1.jpg","tags":"test"},{"url":"test3.jpg","tags":"test"}]');
    localStorage.clear();
  });
});
