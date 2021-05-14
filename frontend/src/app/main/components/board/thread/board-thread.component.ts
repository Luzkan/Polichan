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
              private readonly postService: PostService) {
    super();
  }

  toggleShowThread() {
    this.threadIsShown = !this.threadIsShown;
  }

  toggleShowPostsInThread() {
    this.postsInThreadAreShown = !this.postsInThreadAreShown;
    // if (this.postsInThreadAreShown) { element.text = '[-]' } else { element = '[+]' }
  }

  ngOnInit(): void {
    this.loadPostsForThread(this.getThread());
  }

  private loadPostsForThread(thread: Thread):void {
    this.addSubscription(
        this.postService.getPosts(thread.id, this.pageable)
            .subscribe((posts) => {
              this.posts = posts;
              this.changeDetector.markForCheck();
            }),
        'loadPostsForThread',
    );
  }

  private getThread(): Thread {
    return this.safeGetter(this.thread, 'thread');
  }
}
