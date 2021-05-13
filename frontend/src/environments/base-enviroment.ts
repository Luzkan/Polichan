// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Dictionary} from '../app/core/types/dictionary.model';
import {ApiPatternKey} from '../app/core/api/api-pattern-key.model';

export const baseEnvironment = {
  production: false,
  inMemoryApiEnabled: true,
  url: {
    prefix: '/api',
    patterns: {
      [ApiPatternKey.THREAD]: '/threads/{id}',
      [ApiPatternKey.THREADS]: '/threads',
      [ApiPatternKey.THREAD_POSTS]: '/thread/{id}/posts',
      [ApiPatternKey.POST]: '/posts/{id}',
    } as Dictionary<string>,
  },
};
