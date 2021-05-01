import {Component, NgModule, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class ReplyComponent implements OnInit {
  constructor() { }

  // public Editor = ClassicEditor;
  selectValue = ["1"]

  ngOnInit() {

  }

}
