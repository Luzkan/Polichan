import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {ThreadCategory} from '../models/thread-category.model';
import {threadCategoryByRouteId} from '../navigation/route-category-id.model';
import {isNil} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<ThreadCategory> {
  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): ThreadCategory {
    const id = route.params.id;
    const categoryId = threadCategoryByRouteId[id];
    if (isNil(categoryId)) {
      this.router.navigate(['']);
    }
    return categoryId;
  }
}
