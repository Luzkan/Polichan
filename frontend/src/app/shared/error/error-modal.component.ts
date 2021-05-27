import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModalComponent {
  @Input()
  headerKey = 'Modal.Error.Default.Header';

  @Input()
  messageKey = 'Modal.Error.Default.Message';

  @Input()
  successButtonKey = 'Modal.Error.Default.Ok';

  constructor(private readonly modalRef: BsModalRef) {
  }

  close() {
    this.modalRef.hide();
  }
}
