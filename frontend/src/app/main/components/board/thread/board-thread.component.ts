import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {Optional} from '../../../../core/types/optional.model';
import {Thread} from '../../../models/thread.model';
import {Post} from '../../../models/post.model';
import {PostService} from '../../../services/post.service';
import {AbstractCleanable} from '../../../../core/cleanable/abstract-cleanable.component';
import {Pageable} from '../../../../core/api/pageable.model';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ErrorModalComponent} from '../../../../shared/error/error-modal.component';

@Component({
  selector: 'app-board-thread',
  templateUrl: './board-thread.component.html',
  styleUrls: ['./board-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BoardThreadComponent extends AbstractCleanable implements OnInit {
  @Input()
  thread: Optional<Thread>;

  posts: Optional<Post[]>;

  threadIsShown: boolean = true;

  postsInThreadAreShown: boolean = false;

  private readonly pageable = Pageable.forLimit(3);

  constructor(private readonly changeDetector: ChangeDetectorRef,
              private readonly modalService: BsModalService,
              private readonly postService: PostService) {
    super();
  }

  toggleShowThread() {
    this.threadIsShown = !this.threadIsShown;
    if (!this.threadIsShown) {
      this.postsInThreadAreShown = false;
    }
  }

  toggleShowPostsInThread() {
    this.postsInThreadAreShown = !this.postsInThreadAreShown;
  }

  ngOnInit(): void {
    this.loadPostsForThread(this.getThread());
  }

  private loadPostsForThread(thread: Thread): void {
    this.addSubscription(
        this.postService.getPosts(thread.id, this.pageable)
            .subscribe((posts) => {
              this.posts = posts;
              this.changeDetector.markForCheck();
            }, () => this.handleLoadingPostsError()),
        'loadPostsForThread',
    );
  }

  private getThread(): Thread {
    return this.safeGetter(this.thread, 'thread');
  }

  private handleLoadingPostsError(): void {
    this.modalService.show(ErrorModalComponent);
  }
}
