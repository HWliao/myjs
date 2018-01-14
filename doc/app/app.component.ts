import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'im-doc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private elementRef: ElementRef) {
  }

  /**
   * 改变主题
   * @param isDark
   */
  changeTheme(isDark) {
    const darkThemeClass = 'unicorn-dark-theme';
    if (isDark) {
      this.elementRef.nativeElement.classList.add(darkThemeClass);
    } else {
      this.elementRef.nativeElement.classList.remove(darkThemeClass);
    }
  }
}
