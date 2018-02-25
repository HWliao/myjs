import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'im-sidebar-header',
  templateUrl: './im-sidebar-header.component.html'
})
export class ImSidebarHeaderComponent implements OnInit {

  /**
   * 收起按钮的标题
   * @type {string}
   */
  @Input() title = '';

  /**
   * 总未读数
   * @type {number}
   */
  @Input() unread = 0;

  /**
   * 是否闪动
   * @type {boolean}
   */
  @Input() shake = false;

  constructor() {
  }

  ngOnInit() {
  }

}
