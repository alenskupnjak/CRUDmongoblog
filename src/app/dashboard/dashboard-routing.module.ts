import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceListingComponent } from '../invoices/components/invoice-listing/invoice-listing.component';
import { ClientListingComponent } from '../clients/components/client-listing/client-listing.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';
import { HeroComponent } from '../hero/hero.component';
import { HeroListComponent } from '../hero/hero-list/hero-list.component';
import { HeroDetailComponent } from '../hero/hero-detail/hero-detail.component';

const routes: Routes = [
  {path: '', component : DashboardComponent,
   children: [
     {path : 'invoices', component: InvoiceListingComponent},
     {path : 'invoices/new',  component: InvoiceFormComponent},
     {path : 'invoices/:id',  component: InvoiceFormComponent},
     {path : 'clients',  component: ClientListingComponent},
     {path : 'hero',  component: HeroComponent},
     {path : 'heroList',  component: HeroListComponent},
     {path : 'heroDetail',  component: HeroDetailComponent},
     {path : '**',  redirectTo: 'invoices'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
