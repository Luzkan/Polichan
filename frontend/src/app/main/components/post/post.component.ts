import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PostComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  testVariable: String = ""

  @Output()
  testOutput = new EventEmitter()

  select() {
    this.testOutput.emit();
  }
}
