import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractBoardComponent} from './abstract-board.component';
import {Pageable} from '../../../core/api/pageable.model';
import {Thread} from '../../models/thread.model';
import {Observable} from 'rxjs';
import {ThreadService} from '../../services/thread.service';

@Component({
  selector: 'app-random-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RandomBoardComponent extends AbstractBoardComponent {
  constructor(changeDetector: ChangeDetectorRef,
      threadService: ThreadService) {
    super(changeDetector, threadService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitleKey('Board.Title.Random');
  }


  protected getThreadsForPage(pageable: Pageable): Observable<Thread[]> {
    return this.threadService.getRandomThreads(pageable);
  }
}
