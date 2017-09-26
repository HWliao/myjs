import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `,
  selector: 'app-hero-detail'
})
export class HeroDetailComponent {
  @Input() hero: Hero;
}
