import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

let page_str = "";
class MockService {  
  private page = new BehaviorSubject("search123");
  currentPage = this.page.asObservable();
  changePage(newPage: string) {
    this.page.next(newPage);
    page_str = newPage;
  }  
}

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: ImageFinderService, useClass: MockService}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change page to bookmarks", () => {
    const bookmarksButton = fixture.nativeElement.querySelector("#bookmarksPageButton");
    bookmarksButton.click();
    expect(page_str).toEqual("bookmarks")
  });

  it("should change page to search", () => {
    const bookmarksButton = fixture.nativeElement.querySelector("#searchPageButton");
    bookmarksButton.click();
    expect(page_str).toEqual("search");
  });

});
