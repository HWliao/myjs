import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DocComponent } from './doc.component';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { DocListItemModel } from '../../core/doc-list-item.model';
import { ImDocService } from '../../core/im-doc.service';
import { BrowserModule, By } from '@angular/platform-browser';
import Spy = jasmine.Spy;

const items: DocListItemModel[] = [];
items.push(new DocListItemModel(
  0,
  'icon0',
  'content0',
  'desc0',
  'subHeader0',
  true
));
items.push(new DocListItemModel(
  1,
  'icon1',
  'content1',
  'desc1'
));


describe('DocComponent', () => {
  let component: DocComponent;
  let fixture: ComponentFixture<DocComponent>;
  let imDocService: ImDocService;
  let getItemsSpy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocComponent, NgxPrismStubComponent],
      providers: [ImDocService],
      imports: [BrowserModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocComponent);
    component = fixture.componentInstance;

    imDocService = fixture.debugElement.injector.get(ImDocService);

    getItemsSpy = spyOn(imDocService, 'getItems').and.returnValue(Promise.resolve(items));
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should have 2 list-item in drawer', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const matListItems = fixture.debugElement.queryAll(By.css('mat-drawer mat-nav-list mat-list-item'));
      expect(matListItems.length).toBe(2);

      const navDe = fixture.debugElement.query(By.css('mat-drawer mat-nav-list'));
      const headerDe0 = navDe.children[0];
      expect(headerDe0).toBeTruthy();
      expect(headerDe0.nativeElement.nodeName).toBe('H3', 'should be h3');
      expect(headerDe0.nativeElement.innerText).toBe(items[0].subHeader);

      const itemDe0 = navDe.children[1];
      const iconDe0 = itemDe0.query(By.css('mat-icon'));
      const contentDe0 = itemDe0.query(By.css('h4'));
      expect(itemDe0).toBeTruthy();
      expect(itemDe0.nativeElement.classList.contains('curr')).toBeTruthy();
      expect(iconDe0).toBeTruthy();
      expect(iconDe0.nativeElement.innerText).toBe(items[0].icon);
      expect(contentDe0.nativeElement.innerText).toBe(items[0].content);

      const deviderDe0 = navDe.children[2];
      expect(deviderDe0).toBeTruthy();

      const itemDe1 = matListItems[1];
      expect(itemDe1).toBeTruthy();
      const iconDe1 = itemDe1.query(By.css('mat-icon'));
      const contentDe1 = itemDe1.query(By.css('h4'));
      expect(iconDe1).toBeTruthy();
      expect(iconDe1.nativeElement.innerText).toBe(items[1].icon);
      expect(contentDe1.nativeElement.innerText).toBe(items[1].content);
    });
  }));

  it('should have right init content', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const contentDe = fixture.debugElement.query(By.css('mat-drawer-content'));
      expect(contentDe).toBeTruthy();
      const headerDe = contentDe.query(By.css('header h1'));
      expect(headerDe).toBeTruthy();
      expect(headerDe.nativeElement.innerText).toBe(items[0].content);

      const sectionDe = contentDe.query(By.directive(NgxPrismStubComponent));
      expect(sectionDe).toBeTruthy();
      expect(sectionDe.componentInstance.code).toBe(items[0].desc);
    });
  }));

  it('should chang currItem by click list item', fakeAsync(() => {
    fixture.debugElement.componentInstance.ngOnInit();
    tick();
    fixture.detectChanges();
    const theItem = items[1];
    const listItemDe1 = fixture.debugElement.queryAll(By.css('mat-drawer mat-nav-list mat-list-item'))[1];
    listItemDe1.triggerEventHandler('click', theItem);
    tick();
    fixture.detectChanges();
    expect(listItemDe1.nativeElement.classList.contains('curr')).toBeTruthy();
    const headerDe = fixture.debugElement.query(By.css('mat-drawer-content header h1'));
    expect(headerDe.nativeElement.innerText).toBe(theItem.content);
    const codeDe = fixture.debugElement.query(By.directive(NgxPrismStubComponent));
    expect(codeDe.componentInstance.code).toBe(theItem.desc);
  }));
});

@Component({
  // tslint:disable-next-line
  selector: 'ngx-prism',
  template: ''
})
class NgxPrismStubComponent {
  @Input() code: string;
  @Input() language: string;
  @Input() cd: any;
}
