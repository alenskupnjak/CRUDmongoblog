import { Component } from '@angular/core';
import { Hero } from '../../shared/hero';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
})

export class HeroListComponent  {
  title: string;
  myHero: Hero;

  heroes: Hero[] = [
    {id: 1, rating: 3.45230, name : 'Jane', salary: 23234.9, joinDate: new Date()},
    {id: 2, rating: 4.45230, name : 'Doe', salary: 53234.9, joinDate: new Date()},
    {id: 3, rating: 2.22220, name : 'Moje', salary: 222222.9, joinDate: new Date()}];


  constructor() {
    this.title = 'Slon List';
    this.myHero = this.heroes[0];
   }

  onDeleteHandler(hero: Hero) {
    console.log(hero);
    const index = this.heroes.findIndex(pod => pod.id === hero.id);
    this.heroes.splice(index, 1);
    this.jos(index);
  }

  jos(x) {
    this.myHero = this.heroes[x];
  }

}
