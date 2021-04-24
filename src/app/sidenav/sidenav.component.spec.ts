import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageFinderService } from "../imagefinder.service";

class MockService {  
  private page = new BehaviorSubject("search");
  currentPage = this.page.asObservable();
  changePage(newPage: string) {
    console.log("newPage = " + newPage);
    this.page.next(newPage);
  }  
}

let page_str = "";
const image_service = new MockService();
image_service.currentPage.subscribe(page => page_str = page);

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
    console.log(component);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should change page", () => {
    console.log(component);
    const bookmarksButton = fixture.nativeElement.querySelector("#bookmarksPageButton");
    bookmarksButton.click();
    console.log("after click = " + page_str);
  });
});
