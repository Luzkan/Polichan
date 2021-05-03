import {Component, OnInit} from '@angular/core';
import {ThreadService} from '../../services/thread.service';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {Thread} from '../../models/thread.model';
import {Observable} from 'rxjs';
import {Optional} from '../../../core/types/optional.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AbstractCleanable implements OnInit {
  threads: Optional<Observable<Thread[]>>;

  constructor(private readonly threadService: ThreadService) {
    super();
  }

  ngOnInit(): void {
    this.threads = this.threadService.getThreads();
  }

  selected(event: String) {
    console.log(event);
  }
}
