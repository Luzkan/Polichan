import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TestComponent} from "./components/test/test.component";
import {PostComponent} from "./components/post/post.component";
import {ReplyComponent} from "./components/reply/reply.component";

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
    path: 'post',
    component: PostComponent,
    pathMatch: 'full',
  },
  {
    path: 'reply',
    component: ReplyComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
