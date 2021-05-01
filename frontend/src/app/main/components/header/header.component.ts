import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  boardMainList = ['poli/', 'random/']
  boardThematicList = ['it/', 'math/', 'med/', 'bio/', 'chem/', 'phys/', 'elec/', 'bud/', 'arch/', 'mech/']

  selected(event: String) {
    console.log(event);
  }
}
