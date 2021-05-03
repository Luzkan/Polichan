import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {EMPTY, Subject, timer} from 'rxjs';
import {debounce, distinctUntilChanged, map, scan} from 'rxjs/operators';

enum SpinnerAction {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
}

export const PRIMARY_SPINNER_NAME = 'PRIMARY';

@Injectable({
  providedIn: 'root',
})
export class SpinnerControllerService {
  private actionSource = new Subject<SpinnerAction>();

  constructor(private readonly spinner: NgxSpinnerService) {
    this.init();
  }

  show(): void {
    this.actionSource.next(SpinnerAction.SHOW);
  }

  hide(): void {
    this.actionSource.next(SpinnerAction.HIDE);
  }

  private init() {
    this.actionSource.pipe(
        scan((acc, action) => acc + (action === SpinnerAction.SHOW ? 1 : -1), 0),
        map((openedCount) => openedCount === 0 ? SpinnerAction.HIDE : SpinnerAction.SHOW),
        debounce((action) => action === SpinnerAction.HIDE ? timer(300) : EMPTY),
        distinctUntilChanged(),
    ).subscribe((action) => {
      if (action === SpinnerAction.HIDE) {
        this.spinner.hide(PRIMARY_SPINNER_NAME);
      } else {
        this.spinner.show(PRIMARY_SPINNER_NAME);
      }
    });
  }
}
