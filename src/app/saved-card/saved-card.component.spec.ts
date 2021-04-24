import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardComponent } from './saved-card.component';

const mockImg = {
  url: "testURL",
  tags: "test tags"
};

const mockSavedImgs = [
  {url:"test1.jpg",tags:"test"},
  {url:"test2.jpg",tags:"test"},
  {url:"test3.jpg",tags:"test"},
];
const JSONstr = JSON.stringify(mockSavedImgs);
localStorage.setItem("imageFinder", JSONstr);

describe('SavedCardComponent', () => {
  let component: SavedCardComponent;
  let fixture: ComponentFixture<SavedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCardComponent ]
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
    const deleteButton = fixture.nativeElement.querySelector("#del_img_button");
    deleteButton.click();
    const bookmarks = localStorage.getItem("imageFinder");
    console.log(bookmarks);
    expect(bookmarks).toEqual('[{"url":"test1.jpg","tags":"test"},{"url":"test3.jpg","tags":"test"}]');
  });
});
