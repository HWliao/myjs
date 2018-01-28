import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { forEach } from '@angular/router/src/utils/collection';
import { DebugContext } from '@angular/core/src/view';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let comp: AppComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    de = fixture.debugElement;
    comp = de.componentInstance;
    el = de.nativeElement;
  });

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it('should have component im-doc-nav', () => {
    fixture.detectChanges();
    const navEl = de.queryAll(By.css('im-doc-nav'));
    expect(navEl.length).toBe(1, 'should query 1 element');
    expect(navEl[0].name).toBe('im-doc-nav', 'the element name should be im-doc-nav');
  });

  it('should have a route-outlet', () => {
    fixture.detectChanges();
    const routeOutlet = de.queryAll(By.css('router-outlet'));
    expect(routeOutlet.length).toBe(1, 'just one route-outlet element');
  });

  it('should toggle the theme', () => {
    fixture.detectChanges();
    // init light theme
    expect(el.classList.contains(AppComponent.DARK_THEME_CLASS)).toBeFalsy('init should be light theme.');
    // toggle to dark theme
    comp.changeTheme(true);
    expect(el.classList.contains(AppComponent.DARK_THEME_CLASS)).toBeTruthy('should toggle to dark theme.');
    // toggle to light theme
    comp.changeTheme(false);
    expect(el.classList.contains(AppComponent.DARK_THEME_CLASS)).toBeFalsy('shold toggle to light theme.');
  });
});
