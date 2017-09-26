import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';

import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        component: DashboardComponent
      }, {
        path: 'heroes',
        component: HeroesComponent
      }, {
        path: 'detail/:id',
        component: HeroDetailComponent
      },
    ])
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
