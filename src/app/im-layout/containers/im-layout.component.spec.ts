import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { reducers } from '../../../../testing/utils/utils';

import { ImLayoutComponent } from './im-layout.component';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { ImLayoutShowAction, ImLayoutUpAction } from '../actions/im-layout.action';

fdescribe('ImLayoutComponent', () => {
  let component: ImLayoutComponent;
  let fixture: ComponentFixture<ImLayoutComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImLayoutComponent],
      imports: [
        StoreModule.forRoot(reducers)
      ]
    })
      .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ImLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  describe('display style', () => {
    it('should be none when init', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const rootDivDe = fixture.debugElement.query(By.css('.jjsim'));
      expect(rootDivDe.nativeElement.style.display).toBe(ImLayoutComponent.DISPLAY_NONE);
    }));
    it('should be block when did IM_LAYOUT_SHOW_ACTION', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      store.dispatch(new ImLayoutShowAction());
      tick();
      fixture.detectChanges();
      const rootDivDe = fixture.debugElement.query(By.css('.jjsim'));
      expect(rootDivDe.nativeElement.style.display).toBe(ImLayoutComponent.DISPLAY_BLOCK);
    }));
  });

  describe('im-fold class', () => {
    it('should not contains im-fold class when init', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      const rootDivDe = fixture.debugElement.query(By.css('.jjsim'));
      expect(rootDivDe.nativeElement.classList.contains('im-fold')).toBeTruthy();
    }));

    it('should contains im-fold class when did IM_LAYOUT_UP_ACTION', fakeAsync(() => {
      tick();
      fixture.detectChanges();
      store.dispatch(new ImLayoutUpAction());
      tick();
      fixture.detectChanges();
      const rootDivDe = fixture.debugElement.query(By.css('.jjsim'));
      expect(rootDivDe.nativeElement.classList.contains('im-fold')).toBeFalsy();
    }));
  });
});
