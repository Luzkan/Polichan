import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {SpinnerControllerService} from './spinner-controller.service';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private readonly spinnerController: SpinnerControllerService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerController.show();
    const hideAction = this.createSingleHideAction();

    return new Observable((observer) => {
      // And subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req).subscribe(
          (event) => {
            if (event instanceof HttpResponse) {
              hideAction();
              observer.next(event);
            }
          },
          (err) => {
            hideAction();
            observer.error(err);
          },
          () => {
            hideAction();
            observer.complete();
          });
      // return teardown logic in case of cancelled requests
      return () => {
        hideAction();
        subscription.unsubscribe();
      };
    });
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
