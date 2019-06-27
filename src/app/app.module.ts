import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeroService } from './shared/hero.service';
import { Logger } from './shared/logger.service';
import { HeroComponent } from './hero/hero.component';
import { HeroListComponent } from './hero/hero-list/hero-list.component';
import { HeroDetailComponent } from './hero/hero-detail/hero-detail.component';
import { CardComponent } from './card/card.component';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { DialogDaNeComponent } from './shared/dialog-da-ne/dialog-da-ne.component';


// import { DialogService } from '../app/shared/dialog.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HeroListComponent,
    HeroDetailComponent,
    CardComponent,
    DialogDaNeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule

  ],
  providers: [HeroService, Logger],
  bootstrap: [AppComponent],
  entryComponents: [DialogDaNeComponent]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AppModule { }


