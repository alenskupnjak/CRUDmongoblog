import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InvoicesModule } from '../invoices/invoices.module';
import { ClientsModule } from '../clients/clients.module';
import { DialogService } from '../shared/dialog.service';
import { HeroComponent } from '../hero/hero.component';
import { HeroService } from '../shared/hero.service';
import { HeroListComponent } from '../hero/hero-list/hero-list.component';
import { HeroDetailComponent } from '../hero/hero-detail/hero-detail.component';
import { Logger } from '../shared/logger.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InvoicesModule,
    MaterialModule,
    ClientsModule
  ],
  declarations: [
    DashboardComponent,
    MainContentComponent,
    SideNavComponent,
    ToolbarComponent,
    HeroComponent,
    HeroListComponent,
    HeroDetailComponent
  ],
  providers: [ DialogService, HeroService, Logger ]
})

export class DashboardModule { }
