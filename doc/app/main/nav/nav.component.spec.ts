import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from '../../../../testing/stub/router-stub';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent, RouterLinkStubDirective, MatSlideToggleStub],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should has right router link', fakeAsync(() => {
    fixture.detectChanges();

    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    const links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(links.length).toBe(2, 'there are 2 links');
    expect(links[0].routerLink).toBe('/');
    expect(links[1].routerLink).toBe('/doc');

    linkDes.forEach((de, index) => {
      de.triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(links[index].routerLink === links[index].navigatedTo).toBeTruthy();
    });

  }));

  it('should has a toggle btn to toggle dark state', fakeAsync(() => {
    component.isDark = false;
    fixture.detectChanges();
    const toggleBtnDe = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(toggleBtnDe).toBeTruthy('there a mat-slide-toggle component');

    const toggleComponet = toggleBtnDe.injector.get(MatSlideToggleStub);
    expect(toggleComponet.checked).toBeFalsy('init should be false');
    expect(toggleBtnDe.nativeElement.innerText).toEqual('Light', 'should be Light');

    toggleComponet.doChange();
    tick();

    fixture.detectChanges();
    expect(component.isDark).toBeTruthy('toggle to dark');
    expect(toggleComponet.checked).toBeTruthy('toggle to checked');
    expect(toggleBtnDe.nativeElement.innerText).toEqual('Dark', 'should be Dark');
  }));
});


@Component({
  // tslint:disable-next-line
  selector: 'mat-slide-toggle',
  template: '<ng-content></ng-content>'
})
// tslint:disable-next-line
class MatSlideToggleStub {
  constructor() {
  }

  @Input() checked: boolean;
  @Output() change = new EventEmitter();

  doChange() {
    this.change.emit();
  }
}
