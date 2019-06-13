import { Component, OnInit} from '@angular/core';

const MAX_WIDTH_BREAKPOINT = 720;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

links = [
  { name: 'Invoices', url: 'invoices'},
  { name: 'Clients',  url: 'clients'},
  { name: 'Pokus',    url: 'pokus'},
];

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width : ${MAX_WIDTH_BREAKPOINT}px)`);
  constructor() {
    // this.mediaMatcher.addListener((mql) => {    ovo je morao na tačaju napraviti meni radi
    //   zone.run(()  => this.mediaMatcher = mql)
    // })
  }

  ngOnInit() {

  }

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
}
