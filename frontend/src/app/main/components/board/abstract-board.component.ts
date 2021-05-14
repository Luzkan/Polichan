import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {ChangeDetectorRef, Directive, OnInit} from '@angular/core';
import {Thread} from '../../models/thread.model';
import {Optional} from '../../../core/types/optional.model';
import {ThreadCategory} from '../../models/thread-category.model';
import {Observable} from 'rxjs';
import {Pageable} from '../../../core/api/pageable.model';
import {ThreadService} from '../../services/thread.service';

@Directive()
export abstract class AbstractBoardComponent extends AbstractCleanable implements OnInit {
  private readonly pageLimit = 3;
  category: Optional<ThreadCategory>;
  titleTranslationKey: string = '';

  threads: Thread[] = [];
  allThreadLoaded = false;
  private pageable: Optional<Pageable>;

  constructor(private readonly changeDetector: ChangeDetectorRef,
              protected readonly threadService: ThreadService) {
    super();
  }

  protected abstract getThreadsForPage(pageable: Pageable): Observable<Thread[]>;

  protected setTitleForCategory(categoryId: ThreadCategory): void {
    const categoryKey = categoryId.charAt(0).toUpperCase() + categoryId.slice(1).toLowerCase();
    this.titleTranslationKey = `Board.Title.${categoryKey}`;
  }

  protected setTitleKey(titleKey: string): void {
    this.titleTranslationKey = titleKey;
  }

  protected setupReplyForm(category: ThreadCategory): void {
    this.category = category;
  }

  ngOnInit(): void {
    this.resetThreads();
  }

  resetThreads(): void {
    this.threads = [];
    this.allThreadLoaded = false;
    this.loadForPage(Pageable.forLimit(this.pageLimit));
  }

  loadNextPage(): void {
    this.loadForPage(this.getPageable().nextPage());
  }

  private loadForPage(pageable: Pageable): void {
    this.addSubscription(
        this.getThreadsForPage(pageable).subscribe((additionalThreads) => {
          this.setAdditionalThreads(additionalThreads);
          this.setAllThreadLoadedForResult(additionalThreads, pageable);
          this.pageable = pageable;
          this.markForCheck();
        }),
        'PageLoad',
    );
  }

  private setAllThreadLoadedForResult(threads: Thread[], pageable: Pageable): void {
    this.allThreadLoaded = threads.length !== pageable.limit;
  }

  private setAdditionalThreads(threads: Thread[]): void {
    const current = this.threads;
    this.threads = current.concat(threads);
  }

  saveThread(thread: Thread): void {
    this.addSubscription(
        this.threadService.saveThread(thread).subscribe((savedThread) => {
          console.log(savedThread);
          this.resetThreads();
          this.markForCheck();
        }),
        'saveThread',
    );
  }

  private getPageable(): Pageable {
    return this.safeGetter(this.pageable, 'pageable');
  }

  private markForCheck(): void {
    this.changeDetector.markForCheck();
  }
}
