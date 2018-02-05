import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { OperationPanelComponent } from './operation-panel.component';
import { DocMenuModel } from '../../core/doc-menu.model';
import { Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuPanel } from '@angular/material';
import { ImApiService } from '../../core/im-api.service';
import { By } from '@angular/platform-browser';
import Spy = jasmine.Spy;

describe('OperationPanelComponent', () => {
  let component: OperationPanelComponent;
  let fixture: ComponentFixture<OperationPanelComponent>;
  let testMethod: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OperationPanelComponent, MatMenuStubComponent, MatMenuTriggerForStubDirective],
      providers: [ImApiService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    const imService = TestBed.get(ImApiService);
    imService.testMethod = function () {
    };
    testMethod = spyOn(imService, 'testMethod');

    const datas = [];
    const menu0 = new DocMenuModel();
    menu0.key = 'menu0';
    menu0.items = [
      { triggerForKey: 'menu1', context: 'menu0item1', disable: false, triggerMethod: null },
      { triggerForKey: null, context: 'menu0item2', disable: false, triggerMethod: 'testMethod' }
    ];
    const menu1 = new DocMenuModel();
    menu1.key = 'menu1';
    menu1.items = [
      { triggerForKey: null, context: 'menu1item1', disable: true, triggerMethod: null }
    ];
    datas.push(menu0);
    datas.push(menu1);
    spyOn(imService, 'getMenuItems').and.returnValue(Promise.resolve(datas));
    fixture = TestBed.createComponent(OperationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  fit('should init menus.', fakeAsync(() => {
    tick(1);
    fixture.detectChanges();
    const menuDes = fixture.debugElement.queryAll(By.directive(MatMenuStubComponent));
    expect(menuDes.length).toBe(2, 'should have 2 menus');
    const menus = menuDes.map((menuDe) => menuDe.componentInstance);
    component.menus.reset(menus);
    component.menus.notifyOnChanges();
    tick(1);
    fixture.detectChanges();

    const menuDe0 = menuDes[0];
    const menuDe0ItmeDes = menuDe0.queryAll(By.css('[mat-menu-item]'));
    expect(menuDe0ItmeDes.length).toBe(2, 'menu0 shold have 2 items');
    const menuDe0ItemDe0 = menuDe0ItmeDes[0];
    const menuDe0ItemDe1 = menuDe0ItmeDes[1];
    expect(menuDe0ItemDe0.nativeElement.innerText).toBe('menu0item1');
    const menuDe0ItemDe0Trigger = menuDe0ItemDe0.injector.get(MatMenuTriggerForStubDirective);
    expect(menuDe0ItemDe0Trigger).toBeTruthy();
    expect(menuDe0ItemDe0Trigger.matMenuTriggerFor).toBeTruthy(menus[1]);

    expect(menuDe0ItemDe1.nativeElement.innerText).toBe('menu0item2');

    const menuDe1 = menuDes[1];
    const menuDe1ItemDes = menuDe1.queryAll(By.css('[mat-menu-item]'));
    expect(menuDe1ItemDes.length).toBe(1);
    expect(menuDe1ItemDes[0].nativeElement.innerText).toBe('menu1item1');
    expect(menuDe1ItemDes[0].properties.disabled).toBeTruthy();

    const menuBtnDe = fixture.debugElement.query(By.directive(MatMenuTriggerForStubDirective));
    expect(menuBtnDe).toBeTruthy();
    const menuBtnTrigger = menuBtnDe.injector.get(MatMenuTriggerForStubDirective);
    expect(menuBtnTrigger).toBeTruthy();
    expect(menuBtnTrigger.matMenuTriggerFor).toBe(menus[0]);

    discardPeriodicTasks();
  }));
});

@Directive({
  // tslint:disable-next-line
  selector: '[matMenuTriggerFor]'
})
class MatMenuTriggerForStubDirective {
  @Input() matMenuTriggerFor: MatMenuPanel;
}

@Component({
  // tslint:disable-next-line
  selector: 'mat-menu',
  template: '<ng-content></ng-content>'
})
class MatMenuStubComponent {

}
