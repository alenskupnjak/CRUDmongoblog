import { NgModule} from '@angular/core';
import {Component } from '@angular/core';
import { HeroService } from '../shared/hero.service';

@Component({
  selector : 'app-hero',
  templateUrl: './hero.component.html',
  styles: [`*{
    color: white;
    font-styles:arial;
    font-size: 15px;
    background-color: blue;
              }`]
})

export class HeroComponent {
title = 'Hero komponent sekcija';
hero = { name: 'Jane Doe', salary: 5000.34, joinDate: new Date()};

polje = [
  {id: 1, name: 'Heroes 001'},
  {id: 2, name: 'Heroes 02'},
  {id: 3, name: 'Heroes 03'}
];

constructor(private heroService: HeroService) {
  this.polje = this.heroService.getHeroes();
}


}
