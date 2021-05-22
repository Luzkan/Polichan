import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryResolver} from './services/category-resolver.service';
import {ThreadComponent} from './components/thread/thread.component';
import {MainBoardComponent} from './components/board/mian-board.component';
import {RandomBoardComponent} from './components/board/random-board.component';
import {CategoryBoardComponent} from './components/board/category-board.component';
import {ThreadResolver} from './services/thread-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainBoardComponent,
    pathMatch: 'full',
  },
  {
    path: 'random',
    component: RandomBoardComponent,
    pathMatch: 'full',
  },
  {
    path: 'category/:id',
    component: CategoryBoardComponent,
    pathMatch: 'full',
    resolve: {
      categoryId: CategoryResolver,
    },
  },
  {
    path: 'thread/:id',
    component: ThreadComponent,
    pathMatch: 'full',
    resolve: {
      threadId: ThreadResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
