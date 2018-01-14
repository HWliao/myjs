import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'im-doc-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  /**
   * 是否为暗主题
   */
  @Input() isDark: boolean;

  /**
   * 主题选择变化
   * @type {EventEmitter<boolean>}
   */
  @Output() themeChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 主题变化
   */
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeChange.emit(this.isDark);
  }
}
