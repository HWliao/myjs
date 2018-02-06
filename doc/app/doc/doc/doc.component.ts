import { Component, OnInit } from '@angular/core';
import { DocListItemModel } from '../../core/doc-list-item.model';
import { ImDocService } from '../../core/im-doc/im-doc.service';

@Component({
  selector: 'im-doc-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {

  items: DocListItemModel[];
  currItem: DocListItemModel;

  constructor(private imDocService: ImDocService) {
  }

  ngOnInit() {
    this.imDocService.getItems().then((items = []) => {
      this.items = items;
      this.currItem = this.items[0];
    });
  }

  onClickItem(item) {
    this.currItem = item;
  }
}
