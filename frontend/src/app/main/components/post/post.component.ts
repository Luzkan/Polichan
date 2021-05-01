import {Component, OnInit, ViewEncapsulation} from '@angular/core';

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
}
