import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test-two.component.html',
  styleUrls: ['./test-two.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TestTwoComponent implements OnInit {
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
