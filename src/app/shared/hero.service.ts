import { Injectable } from '@angular/core';
import { Logger } from './logger.service';

@Injectable()
export class HeroService {

  heroes = [
    {id: 1, name : 'Iz hero servisa Jane'},
    {id: 2, name: 'iz servisa -Doe'},
    {id: 3, name: 'Iz servisa - Tin'}
];

  constructor(private logger: Logger) {}

  getHeroes() {
    this.logger.log('get Heroes fetched');
    return this.heroes;
  }
}
