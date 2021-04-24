import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './search-page.component';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

let search_str = "";
class MockService {  
  private searchText = new BehaviorSubject("");
  currentSearchText = this.searchText.asObservable();
  changeSearchText(newText: string) {
    this.searchText.next(newText);
    search_str = newText;
  }
  private images = new BehaviorSubject([]);
  currentImages = this.images.asObservable();
}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPageComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: ImageFinderService, useClass: MockService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should send search string", () => {
    const input = fixture.nativeElement.querySelector(".search input");
    input.value = "test test";
    const event = new KeyboardEvent("keyup");
    input.dispatchEvent(event);
    expect(search_str).toEqual("test test");
  });
});
