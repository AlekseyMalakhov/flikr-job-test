import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
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

const mockUser = {
  fullName: "user",
  _id: 12,
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterModule.forRoot(appRoutes)],
    })
    .compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.image = mockImg; 
    fixture.detectChanges();     
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should add a tag", () => {
    component.user = mockUser;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(".tagInput input");
    input.value = "test test";
    const event = new KeyboardEvent("keyup", {key: "Enter"});
    input.dispatchEvent(event);
    const tagsStr = JSON.stringify(component.tags);
    expect(tagsStr).toEqual('["test test"]');
  });

  it("should save bookmark", () => {
    component.user = mockUser;
    component.collID = 123;
    component.tags = ["tag1"];
    fixture.detectChanges();
    const addButton = fixture.nativeElement.querySelector(".action button");
    addButton.click();
    const req = httpTestingController.expectOne('https://api.raindrop.io/rest/v1/raindrop');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual('{"link":"testURL","tags":["tag1"],"type":"image","collection":{"$id":123}}');
  });
});
