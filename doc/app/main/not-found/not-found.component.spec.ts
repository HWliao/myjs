import { NotFoundComponent } from './not-found.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', function () {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NotFoundComponent should be create', () => {
    expect(component).toBeTruthy();
  });

  it('should has a h1 tag with 404', () => {
    const h1De = fixture.debugElement.query(By.css('h1'));
    expect(h1De).toBeTruthy('has a tage h1');
    expect(h1De.nativeElement.innerText).toEqual('404', 'should equal 404');
  });
});
