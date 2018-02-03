import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatMenu } from '@angular/material';
import { isEmpty } from 'lodash';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'im-doc-operation-panel',
  templateUrl: './operation-panel.component.html',
  styleUrls: ['./operation-panel.component.css']
})
export class OperationPanelComponent implements OnInit, AfterViewInit {
  ds = [];
  datas = [];
  private menuMap = {};

  @ViewChildren(MatMenu) menus: QueryList<MatMenu>;

  constructor() {
    const menu0 = {
      key: 'menu0',
      items: [
        { triggerForKey: 'menu1', context: 'Vertebrates', disable: false, triggerMethod: 'm1' },
        { triggerForKey: 'menu2', context: 'Invertebrates', disable: false, triggerMethod: 'm1' }
      ]
    };
    const menu1 = {
      key: 'menu1',
      items: [
        { triggerForKey: 'menu3', context: 'Fishes', disable: false, triggerMethod: 'm1' },
        { triggerForKey: 'menu4', context: 'Amphibians', disable: false, triggerMethod: 'm1' },
        { triggerForKey: 'menu5', context: 'Reptiles', disable: false, triggerMethod: 'm1' },
        { context: 'Birds', disable: false, triggerMethod: 'm1' },
        { context: 'Mammals', disable: false, triggerMethod: 'm1' }
      ]
    };
    const menu2 = {
      key: 'menu2',
      items: [
        { context: 'Insects', disable: false, triggerMethod: 'm1' },
        { context: 'Molluscs', disable: false, triggerMethod: 'm1' },
        { context: 'Crustaceans', disable: false, triggerMethod: 'm1' },
        { context: 'Corals', disable: false, triggerMethod: 'm1' },
        { context: 'Arachnids', disable: false, triggerMethod: 'm1' },
        { context: 'Velvet worms', disable: false, triggerMethod: 'm1' },
        { context: 'Horseshoe crabs', disable: false, triggerMethod: 'm1' }
      ]
    };
    const menu3 = {
      key: 'menu3',
      items: [
        { context: 'Baikal oilfish', disable: false, triggerMethod: 'm1' },
        { context: 'Bala shark', disable: false, triggerMethod: 'm1' },
        { context: 'Ballan wrasse', disable: false, triggerMethod: 'm1' },
        { context: 'Bamboo shark', disable: false, triggerMethod: 'm1' },
        { context: 'Banded killifish', disable: false, triggerMethod: 'm1' },
      ]
    };
    const menu4 = {
      key: 'menu4',
      items: [
        { context: 'Sonoran desert toad', disable: false, triggerMethod: 'm1' },
        { context: 'Western toad', disable: false, triggerMethod: 'm1' },
        { context: 'Arroyo toad', disable: false, triggerMethod: 'm1' },
        { context: 'Yosemite toad', disable: false, triggerMethod: 'm1' }
      ]
    };
    const menu5 = {
      key: 'menu5',
      items: [
        { context: 'Banded Day Gecko', disable: false, triggerMethod: 'm1' },
        { context: 'Banded Gila Monster', disable: false, triggerMethod: 'm1' },
        { context: 'Black Tree Monitor', disable: false, triggerMethod: 'm1' },
        { context: 'Sonoran desert toad', disable: false, triggerMethod: 'm1' },
        { context: 'Blue Spiny Lizard', disable: false, triggerMethod: 'm1' },
      ]
    };

    this.ds.push(menu0);
    this.ds.push(menu1);
    this.ds.push(menu2);
    this.ds.push(menu3);
    this.ds.push(menu4);
    this.ds.push(menu5);
  }

  ngOnInit() {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    }).then(() => this.datas = this.ds);
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
    setTimeout(() => {
      this.datas[0].items[0].disable = true;
    }, 5000);
  }
}
