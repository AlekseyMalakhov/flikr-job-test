import { HostListener, Component, OnInit } from '@angular/core';
import { RaindropService } from "./raindrop.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'flikr-job-test';
  timer;
  hide: boolean = false;
  user = {fullName: "", _id: null}

  constructor(private raindrop: RaindropService) { }

  ngOnInit() {  
    this.raindrop.currentUser.subscribe(user => this.user = user);
    this.resetTimer();    
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:touchstart')
  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.user._id) {
        this.raindrop.logout();
        this.hide = true;
      }
    }, 60000);
  }

  removeMask() {
    this.hide = false;
  }
}

