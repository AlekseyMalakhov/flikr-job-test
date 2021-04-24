import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardComponent } from './saved-card.component';

const mockImg = {
  url: "testURL",
  tags: "test tags"
}

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
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
