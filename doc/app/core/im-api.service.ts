import { Injectable } from '@angular/core';
import { DocMenuModel } from './doc-menu.model';

@Injectable()
export class ImApiService {

  private menus: DocMenuModel[];

  constructor() {
  }

  /**
   * 获取菜单项
   * @returns {Promise<DocMenuModel[]>}
   */
  getMenuItems(): Promise<DocMenuModel[]> {
    if (!this.menus) {
      this.menus = [];
      const menu0 = {
        key: 'menu0',
        items: [
          { triggerForKey: 'menu1', context: 'Vertebrates', disable: false, triggerMethod: null },
          { triggerForKey: 'menu2', context: 'Invertebrates', disable: false, triggerMethod: null }
        ]
      };
      const menu1 = {
        key: 'menu1',
        items: [
          { triggerForKey: 'menu3', context: 'Fishes', disable: false, triggerMethod: null },
          { triggerForKey: 'menu4', context: 'Amphibians', disable: false, triggerMethod: null },
          { triggerForKey: 'menu5', context: 'Reptiles', disable: false, triggerMethod: null },
          { triggerForKey: null, context: 'Birds', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Mammals', disable: false, triggerMethod: 'emptym' }
        ]
      };
      const menu2 = {
        key: 'menu2',
        items: [
          { triggerForKey: null, context: 'Insects', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Molluscs', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Crustaceans', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Corals', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Arachnids', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Velvet worms', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Horseshoe crabs', disable: false, triggerMethod: 'emptym' }
        ]
      };
      const menu3 = {
        key: 'menu3',
        items: [
          { triggerForKey: null, context: 'Baikal oilfish', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Bala shark', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Ballan wrasse', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Bamboo shark', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Banded killifish', disable: false, triggerMethod: 'emptym' },
        ]
      };
      const menu4 = {
        key: 'menu4',
        items: [
          { triggerForKey: null, context: 'Sonoran desert toad', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Western toad', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Arroyo toad', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Yosemite toad', disable: false, triggerMethod: 'emptym' }
        ]
      };
      const menu5 = {
        key: 'menu5',
        items: [
          { triggerForKey: null, context: 'Banded Day Gecko', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Banded Gila Monster', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Black Tree Monitor', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Sonoran desert toad', disable: false, triggerMethod: 'emptym' },
          { triggerForKey: null, context: 'Blue Spiny Lizard', disable: false, triggerMethod: 'emptym' },
        ]
      };
      this.menus.push(menu0);
      this.menus.push(menu1);
      this.menus.push(menu2);
      this.menus.push(menu3);
      this.menus.push(menu4);
      this.menus.push(menu5);
    }
    return Promise.resolve(this.menus);
  }


  emptym(...args) {
    console.log(args);
  }
}
