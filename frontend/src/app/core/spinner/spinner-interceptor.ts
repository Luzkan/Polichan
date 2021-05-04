import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SpinnerControllerService} from './spinner-controller.service';
import {filter, tap} from 'rxjs/operators';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerController: SpinnerControllerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerController.show();
    const hideAction = this.createSingleHideAction();

    return next.handle(req).pipe(
        filter((e) => e.type !== 0),
        tap(hideAction, hideAction, hideAction),
    );
  }

  private createSingleHideAction(): () => void {
    let hidden = false;
    return () => {
      if (!hidden) {
        hidden = true;
        this.spinnerController.hide();
      }
    };
  }
}
