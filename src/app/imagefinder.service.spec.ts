import { TestBed } from '@angular/core/testing';

import { ImageFinderService } from './imagefinder.service';

describe('ImageFinderService', () => {
  let service: ImageFinderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageFinderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get/set page type", () => {
    let pageType = "";
    service.currentPage.subscribe(page => pageType = page);
    service.changePage("bookmarks");
    expect(pageType).toEqual("bookmarks");
  });

  it("should get/set searchText", () => {
    let searchText = "";
    service.currentSearchText.subscribe(text => searchText = text);
    service.changeSearchText("some test text");
    expect(searchText).toEqual("some test text");
  });

  it("should get/set images", () => {
    let listOfImages = [];
    service.currentImages.subscribe(images => listOfImages = images);
    service.changeImages(["url1", "url2", "url3"]);
    expect(JSON.stringify(listOfImages)).toEqual('["url1","url2","url3"]');
  });
});
