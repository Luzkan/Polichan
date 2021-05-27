import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AbstractBoardComponent} from './abstract-board.component';
import {Pageable} from '../../../core/api/pageable.model';
import {Thread} from '../../models/thread.model';
import {Observable} from 'rxjs';
import {ThreadService} from '../../services/thread.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ErrorModalComponent} from '../../../shared/error/error-modal.component';

@Component({
  selector: 'app-main-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainBoardComponent extends AbstractBoardComponent {
  constructor(private readonly modalService: BsModalService,
      changeDetector: ChangeDetectorRef,
      threadService: ThreadService) {
    super(changeDetector, threadService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setTitleKey('Board.Title.Poli');
  }


  protected getThreadsForPage(pageable: Pageable): Observable<Thread[]> {
    return this.threadService.getThreads(undefined, pageable);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleLoadingPageError(error: any): void {
    this.modalService.show(ErrorModalComponent);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected handleThreadSaveError(error: any): void {
    this.modalService.show(ErrorModalComponent);
  }
}
