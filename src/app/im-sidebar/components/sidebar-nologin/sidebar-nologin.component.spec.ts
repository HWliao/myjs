import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNologinComponent } from './sidebar-nologin.component';

describe('SidebarNologinComponent', () => {
  let component: SidebarNologinComponent;
  let fixture: ComponentFixture<SidebarNologinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNologinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
