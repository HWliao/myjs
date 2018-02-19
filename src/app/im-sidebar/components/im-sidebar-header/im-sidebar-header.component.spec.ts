import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImSidebarHeaderComponent } from './im-sidebar-header.component';

describe('ImSidebarHeaderComponent', () => {
  let component: ImSidebarHeaderComponent;
  let fixture: ComponentFixture<ImSidebarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImSidebarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
