import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes/heroes/heroes.component';
import { SearchComponent } from './components/search/search/search.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail/hero-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    SearchComponent,
    HeroDetailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'econtainers-front' }),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TransferState],
  bootstrap: [AppComponent]
})
export class AppModule { }
