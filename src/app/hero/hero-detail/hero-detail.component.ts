import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../shared/hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styles: [`*{
    color: white;
    font-styles:arial;
    font-size: 15px;
    background-color: green;
              }`]
})
export class HeroDetailComponent implements OnInit {

  @Input('vezaVanjska') hero: Hero;
  @Output('vezaPromjena') promjena = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  deleteHero() {
    this.promjena.emit(this.hero);
  }

}
