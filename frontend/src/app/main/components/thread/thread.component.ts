import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {Optional} from '../../../core/types/optional.model';
import {Thread} from '../../models/thread.model';
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service';
import {Pageable} from '../../../core/api/pageable.model';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, shareReplay} from 'rxjs/operators';
import {EntryFormData} from '../../models/form/base-form-data.model';
import {PostFormData} from '../../models/form/post-form-data.model';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorModalComponent} from '../../../shared/error/error-modal.component';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreadComponent extends AbstractCleanable implements OnInit {
  private static readonly pageLimit = 4;
  private readonly threadSource: Observable<Thread>;
  private pageable = Pageable.forLimit(ThreadComponent.pageLimit);

  thread: Optional<Thread>;
  allPostsLoaded = false;
  posts: Post[] = [];

  showModal: boolean = false;
  show() {
    this.showModal = true;
  }
  hide() {
    this.showModal = false;
  }

  constructor(private readonly route: ActivatedRoute,
              private readonly changeDetector: ChangeDetectorRef,
              private readonly modalService: BsModalService,
              private readonly postService: PostService) {
    super();
    this.threadSource = this.route.data.pipe(map((data) => data.threadId), shareReplay(1));
  }

  onScroll(event: any): void {
    if (event.target.localName !== 'img') return;
    event.preventDefault();

    const targetStyle = event.target.parentNode.parentNode.style;

    const scalePattern = /scale\([0-9|.]*\)/;
    const parenthesesPattern = /\(([^)]+)\)/;

    const matches = targetStyle.transform.match(scalePattern);
    let scaleValue = parseFloat(matches[0].match(parenthesesPattern)[1]);

    if (event.deltaY < 0) {
      scaleValue += 0.1;
      targetStyle.transform = targetStyle.transform.replace(scalePattern, 'scale(' + scaleValue + ')');
    } else {
      scaleValue -= 0.1;
      targetStyle.transform = targetStyle.transform.replace(scalePattern, 'scale(' + scaleValue + ')');
    }
  }

  ngOnInit(): void {
    this.addSubscription(
        this.threadSource.subscribe((thread) => {
          this.resetForThread(thread);
        }),
        'loadThread',
    );
  }

  resetForThread(thread: Thread): void {
    this.allPostsLoaded = false;
    this.thread = thread;
    this.posts = [];
    this.loadFirstPage();
  }

  loadFirstPage(): void {
    this.pageable = Pageable.forLimit(ThreadComponent.pageLimit);
    this.loadNextPage();
  }

  loadNextPage(): void {
    const threadId = this.getThread().id;
    this.addSubscription(
        this.postService.getPosts(threadId, this.pageable).subscribe((additionalPosts) => {
          this.setAdditionalPosts(additionalPosts);
          this.updatePageable(additionalPosts, this.pageable);
          this.markForCheck();
        }, () => this.handleLoadingPostsError()),
        'PageLoad',
    );
  }

  private updatePageable(posts: Post[], pageable: Pageable): void {
    const loaded = posts.length;
    pageable.shiftOffset(loaded);
    this.allPostsLoaded = loaded !== pageable.limit;
  }

  private setAdditionalPosts(posts: Post[]): void {
    const current = this.posts;
    this.posts = current.concat(posts);
  }

  savePost(entry: EntryFormData): void {
    const threadId = this.getThread().id;
    const post: PostFormData = {...entry, threadId: threadId};
    this.addSubscription(
        this.postService.savePost(post).subscribe(() => {
          this.allPostsLoaded = false;
          this.markForCheck();
        }, (error) => this.handleSavePostError(error)),
        'savePost',
    );
  }

  private getThread(): Thread {
    return this.safeGetter(this.thread, 'thread');
  }

  private markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  private handleLoadingPostsError(): void {
    this.showErrorModal();
  }

  private handleSavePostError(error: HttpErrorResponse): void {
    if (error.status == 401) {
      const state: Partial<ErrorModalComponent> = {
        headerKey: 'Modal.Error.Authentication.Header',
        messageKey: 'Modal.Error.Authentication.Message',
        successButtonKey: 'Modal.Error.Authentication.Ok',
      };
      this.showErrorModal(state);
      return;
    }
    this.showErrorModal();
  }

  private showErrorModal(state?: Partial<ErrorModalComponent>) {
    this.modalService.show(ErrorModalComponent, {initialState: state});
  }
}
