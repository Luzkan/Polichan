import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import {Optional} from '../../../core/types/optional.model';
import {Thread} from '../../models/thread.model';
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';

@Component({
  selector: 'app-thread',
  templateUrl: './mainpage-thread.component.html',
  styleUrls: ['./mainpage-thread.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainpageThreadComponent extends AbstractCleanable implements OnChanges {
  @Input()
  thread: Optional<Thread>;

  posts: Optional<Post[]>;

  threadIsShown: boolean = true;
  toggleShowThread() { this.threadIsShown = !this.threadIsShown; }

  constructor(private readonly changeDetector: ChangeDetectorRef,
              private readonly postService: PostService) {
    super();
  }

  ngOnChanges(): void {
    const thread = this.thread;
    if (!thread) {
      return;
    }
    this.addSubscription(
        this.postService.getPosts(thread.id, 3)
            .subscribe((posts) => {
              this.posts = posts;
              this.changeDetector.markForCheck();
            }),
        'POSTS',
    );
  }
}
