import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Thread} from '../models/thread.model';
import {ThreadService} from './thread.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {isNil} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class ThreadResolver implements Resolve<Thread> {
  constructor(private readonly router: Router,
              private readonly threadService: ThreadService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Thread> {
    const id = route.params.id;
    return this.threadService.getThread(id).pipe(
        mergeMap((e) => isNil(e) ? throwError('No data'): of(e)),
        catchError((error) => {
          this.router.navigate(['/']).then();
          return throwError(error);
        }),
    );
  }
}
