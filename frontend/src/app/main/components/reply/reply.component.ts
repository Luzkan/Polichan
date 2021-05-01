import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ReplyComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
