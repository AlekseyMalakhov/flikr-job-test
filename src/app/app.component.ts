import { HostListener, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'flikr-job-test';

  timer;

  ngOnInit() {  
    this.resetTimer();
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  @HostListener('document:click')
  @HostListener('document:wheel')
  @HostListener('document:touchstart')
  resetTimer() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      console.log("Idle time");
    }, 60000);
  }
}

