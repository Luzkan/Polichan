import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TestComponent implements OnInit {
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
