import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  templateUrl: './hero-detail.component.html',
  selector: 'app-hero-detail'
})
export class HeroDetailComponent implements OnInit {
  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  @Input() hero: Hero;

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }
}
