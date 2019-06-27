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

  // hero: Hero[] = [
  //   {id: 1, rating: 3.45230, name : 'Ja', salary: 23234.9, joinDate: new Date()},
  //   {id: 2, rating: 4.45230, name : 'Ti', salary: 53234.9, joinDate: new Date()},
  //   {id: 3, rating: 2.22220, name : 'On', salary: 222222.9, joinDate: new Date()}];

  @Input('vezaVanjska') hero: Hero;
  @Output('vezaPromjena') promjena = new EventEmitter();


  constructor() { }

  ngOnInit() {

  }

  deleteHero() {
    this.promjena.emit(this.hero);
  }

}
