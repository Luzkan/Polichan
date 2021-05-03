import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TestComponent} from './components/test/test.component';
import {MainpageThreadComponent} from './components/thread/mainpage-thread.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'test',
    component: TestComponent,
    pathMatch: 'full',
  },
  {
    path: 'thread',
    component: MainpageThreadComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
