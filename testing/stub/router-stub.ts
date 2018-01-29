/*tslint:disable: directive-selector component-selector*/
// export for convenience.
export { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

import { Component, Directive, HostListener, Injectable, Input } from '@angular/core';
import { convertToParamMap, NavigationExtras, ParamMap } from '@angular/router';
// Only implements params and part of snapshot.paramMap
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input() routerLink: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.routerLink;
  }
}

@Component({ selector: 'router-outlet', template: '' })
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras) {
  }
}


@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() {
    return this._testParamMap;
  }

  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
