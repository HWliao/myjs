import { Component, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'im-doc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * 暗主题的class名
   * @type {string}
   */
  public static DARK_THEME_CLASS = 'unicorn-dark-theme';

  constructor(private elementRef: ElementRef, private overlayContainer: OverlayContainer) {
  }

  /**
   * 改变主题
   * @param isDark
   */
  changeTheme(isDark) {
    const darkThemeClass = AppComponent.DARK_THEME_CLASS;
    if (isDark) {
      this.elementRef.nativeElement.classList.add(darkThemeClass);
      this.overlayContainer.getContainerElement().classList.add(darkThemeClass);
    } else {
      this.elementRef.nativeElement.classList.remove(darkThemeClass);
      this.overlayContainer.getContainerElement().classList.remove(darkThemeClass);
    }
  }
}
