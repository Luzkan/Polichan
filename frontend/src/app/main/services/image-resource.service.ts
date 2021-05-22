import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ApiService} from '../../core/api/api.service';
import {BaseApiService} from '../../core/api/base-api.service';
import {ApiPatternKey} from '../../core/api/api-pattern-key.model';
import {ImageResource} from '../models/form/image-resource.model';
import {EntryFormData} from '../models/form/base-form-data.model';
import {isNil} from 'lodash-es';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageResourceService extends BaseApiService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  uploadImageResource(imageFile: File): Observable<ImageResource> {
    const fd = new FormData();
    fd.append('image', imageFile, imageFile.name);
    return this.apiService.post<FormData, ImageResource>(ApiPatternKey.IMAGE_UPLOAD, fd);
  }

  saveImageAndUpdateContainer<T extends EntryFormData>(container: T): Observable<T> {
    const imageFile = container.imageFile;
    if (isNil(imageFile)) {
      return of(container);
    }
    return this.uploadImageResource(imageFile).pipe(
        map((imageResource) => {
          delete container.imageFile;
          container.imageResourceId = imageResource.id;
          return container;
        }),
    );
  }
}
