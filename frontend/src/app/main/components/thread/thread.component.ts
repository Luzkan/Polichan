import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ThreadComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
