import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should add a tag", () => {
    const input = fixture.nativeElement.querySelector(".tagInput input");
    input.value = "test test";
    const event = new KeyboardEvent("keyup");
    input.dispatchEvent(event);
    expect(component.tags).toEqual("test test");
  });

  it("should save bookmark", () => {
    localStorage.clear();
    component.image = "testURL";
    component.tags = "some tags";
    const addButton = fixture.nativeElement.querySelector(".action button");
    addButton.click();
    const bookmarks = localStorage.getItem("imageFinder");  
    expect(bookmarks).toEqual(`[{"url":"testURL","tags":"some tags"}]`);
    localStorage.clear();
  });
});
