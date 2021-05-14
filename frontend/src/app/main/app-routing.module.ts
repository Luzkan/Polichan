import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CategoryResolver} from './components/category/category-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'random',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'category/:id',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: {
      categoryId: CategoryResolver,
    },
  },
  {
    path: 'thread/:id',
    component: HomeComponent,
    pathMatch: 'full',
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
