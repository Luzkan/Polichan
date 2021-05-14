import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractBoardComponent} from './abstract-board.component';
import {Pageable} from '../../../core/api/pageable.model';
import {Thread} from '../../models/thread.model';
import {Observable} from 'rxjs';
import {ThreadService} from '../../services/thread.service';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {ThreadCategory} from '../../models/thread-category.model';

@Component({
  selector: 'app-random-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryBoardComponent extends AbstractBoardComponent {
  private readonly categorySource: Observable<ThreadCategory>;

  constructor(private readonly route: ActivatedRoute,
      threadService: ThreadService,
      changeDetector: ChangeDetectorRef) {
    super(changeDetector, threadService);
    this.categorySource = this.route.data.pipe(map((data) => data.categoryId), shareReplay(1));
  }

  ngOnInit() {
    this.init();
    super.ngOnInit();
  }


  private init(): void {
    this.addSubscription(this.categorySource.subscribe((category) => {
      this.setTitleForCategory(category);
      this.setupReplyForm(category);
    }));
  }

  protected getThreadsForPage(pageable: Pageable): Observable<Thread[]> {
    return this.categorySource.pipe(
        switchMap((categoryId) => this.threadService.getThreads(categoryId, pageable)),
    );
  }
}
