import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNoagentComponent } from './sidebar-noagent.component';

describe('SidebarNoagentComponent', () => {
  let component: SidebarNoagentComponent;
  let fixture: ComponentFixture<SidebarNoagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarNoagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNoagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
