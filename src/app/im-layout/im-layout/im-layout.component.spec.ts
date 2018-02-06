import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImLayoutComponent } from './im-layout.component';

describe('ImLayoutComponent', () => {
  let component: ImLayoutComponent;
  let fixture: ComponentFixture<ImLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
