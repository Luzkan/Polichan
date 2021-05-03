import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Post} from '../../models/post.model';
import {Optional} from '../../../core/types/optional.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PostComponent {
  @Input()
  post: Optional<Post>;
}
