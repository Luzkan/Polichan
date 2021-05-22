import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {ChangeDetectorRef, Directive, OnInit} from '@angular/core';
import {Thread} from '../../models/thread.model';
import {Optional} from '../../../core/types/optional.model';
import {ThreadCategory} from '../../models/thread-category.model';
import {Observable} from 'rxjs';
import {Pageable} from '../../../core/api/pageable.model';
import {ThreadService} from '../../services/thread.service';
import {EntryFormData} from '../../models/form/base-form-data.model';
import {ThreadFormData} from '../../models/form/thread-form-data.model';

@Directive()
export abstract class AbstractBoardComponent extends AbstractCleanable implements OnInit {
  private static readonly pageLimit = 3;
  category: Optional<ThreadCategory>;
  titleTranslationKey: string = '';

  threads: Thread[] = [];
  allThreadLoaded = false;
  private pageable = Pageable.forLimit(AbstractBoardComponent.pageLimit);

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
    this.loadFirstPage();
  }

  loadFirstPage(): void {
    this.pageable = Pageable.forLimit(AbstractBoardComponent.pageLimit);
    this.loadNextPage();
  }

  loadNextPage(): void {
    this.addSubscription(
        this.getThreadsForPage(this.pageable).subscribe((additionalThreads) => {
          this.setAdditionalThreads(additionalThreads);
          this.updatePageable(additionalThreads, this.pageable);
          this.markForCheck();
        }),
        'PageLoad',
    );
  }

  private updatePageable(threads: Thread[], pageable: Pageable): void {
    const loaded = threads.length;
    pageable.shiftOffset(loaded);
    this.allThreadLoaded = loaded !== pageable.limit;
  }

  private setAdditionalThreads(threads: Thread[]): void {
    const current = this.threads;
    this.threads = current.concat(threads);
  }

  saveThread(entry: EntryFormData): void {
    const category = this.category as ThreadCategory;
    const thread: ThreadFormData = {...entry, category};
    this.addSubscription(
        this.threadService.saveThread(thread).subscribe(() => {
          this.allThreadLoaded = false;
          this.markForCheck();
        }),
        'saveThread',
    );
  }

  private markForCheck(): void {
    this.changeDetector.markForCheck();
  }
}
