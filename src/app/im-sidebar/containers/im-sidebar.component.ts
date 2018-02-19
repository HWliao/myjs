import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'im-sidebar',
  templateUrl: './im-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImSidebarComponent implements OnInit {

  constructor(private store: Store<any>) {
  }

  ngOnInit(): void {
  }

}
