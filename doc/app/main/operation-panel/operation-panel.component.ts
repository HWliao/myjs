import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatMenu } from '@angular/material';
import { isEmpty } from 'lodash';
import 'rxjs/add/operator/delay';
import { ImApiService, ROOT_MENU } from '../../core/im-api/im-api.service';
import { DocMenuModel } from '../../core/doc-menu.model';
import { DocMenuItemModel } from '../../core/doc-menu-item.model';

@Component({
  selector: 'im-doc-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, AfterViewInit {
  private rootMenu = ROOT_MENU;
  private datas: DocMenuModel[];
  private menuMap = {};

  @ViewChildren(MatMenu) menus: QueryList<MatMenu>;

  constructor(private imApiService: ImApiService) {
  }

  ngOnInit() {
    console.log(1);
    this.imApiService.getMenuItems().then((datas) => this.datas = datas);
  }

  ngAfterViewInit() {
    this.menus.changes.delay(0).subscribe(() => {
      if (this.menus.length > 0 && isEmpty(this.menuMap)) {
        const map = {};
        this.menus.forEach((menu, index) => {
          if (this.datas[index] && this.datas[index].key) {
            map[this.datas[index].key] = menu;
          }
        });
        this.menuMap = map;
      }
    });
  }

  doClickMenuItem(item: DocMenuItemModel) {
    if (typeof item.triggerMethod === 'string') {
      this.imApiService[item.triggerMethod](item);
    }
  }
}
