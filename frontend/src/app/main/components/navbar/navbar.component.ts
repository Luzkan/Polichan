import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class NavbarComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  navbarBoardName: String = ''

  @Output()
  testOutput = new EventEmitter()

  select() {
    this.testOutput.emit();
  }
}
