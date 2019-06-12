import { Component } from '@angular/core';
import { HeroService } from './shared/hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`{
    color: green;
    font-family: 'Courier New', Courier, monospace;
    font-size: 250%
  }`]
})

export class AppComponent {
  title = 'Angular Fundamentals';
  constructor(private heroService: HeroService) {
  }
}
