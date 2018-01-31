import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { By } from '@angular/platform-browser';
import { RouterLinkStubDirective } from '../../../../testing/stub/router-stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, RouterLinkStubDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has h1 title WEB IM PLUGIN', () => {
    const h1De = fixture.debugElement.query(By.css('header h1'));
    expect(h1De).toBeTruthy();
    expect(h1De.nativeElement.innerText).toBe('WEB IM PLUGIN');
  });

  it('should has h2 secendar title', () => {
    const h2De = fixture.debugElement.query(By.css('header h2'));
    expect(h2De).toBeTruthy();
    expect(h2De.nativeElement.innerText).toBe('用于为系统内部网站提供及时聊天功能');
  });

  it('should has a image in section', () => {
    const img = fixture.debugElement.query(By.css('section div img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src.endsWith('/assets/images/im.png')).toBeTruthy();
  });

  fit('shoul has a link to /doc', () => {
    const starterDe = fixture.debugElement.query(By.css('.header-starter'));
    const linkDe = starterDe.query(By.directive(RouterLinkStubDirective));
    const testDe = starterDe.query(By.css('span'));

    expect(linkDe).toBeTruthy();
    expect(linkDe.componentInstance).toBeTruthy();
    const linkComponent: RouterLinkStubDirective = linkDe.injector.get(RouterLinkStubDirective);
    expect(linkComponent.routerLink).toBe('/doc', 'the link should to be /doc');
    expect(testDe).toBeTruthy();
    expect(testDe.nativeElement.innerText).toBe('立即开始');
  });
});
