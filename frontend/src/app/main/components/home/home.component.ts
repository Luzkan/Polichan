import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {ThreadCategory} from '../../models/thread-category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HomeComponent extends AbstractCleanable implements OnInit {
  constructor(private readonly threadService: ThreadService) {
    super();
  }

  ngOnInit(): void {
    this.addSubscription(this.threadService.getThreadsForCategory(ThreadCategory.BIO).subscribe((threads) =>
      console.log(threads),
    ));
  }

  testList = ['1'];

  selected(event: String) {
    console.log(event);
  }
}
