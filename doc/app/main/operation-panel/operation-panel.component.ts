import { AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { MatMenu, MatMenuPanel, MenuPositionX, MenuPositionY } from '@angular/material';

@Component({
  selector: 'im-doc-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, AfterViewInit {
  private rootMenu: MatMenu;

  @ViewChildren(MatMenu) menus: QueryList<MatMenu>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.menus);
    setTimeout(() => {
      if (this.menus) {
        this.rootMenu = this.menus.first;
      }
    }, 0);

  }
}
