import {Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ThreadCategory} from '../../models/thread-category.model';
import {Optional} from '../../../core/types/optional.model';
import {Thread} from '../../models/thread.model';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-balloon-block';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class ReplyComponent extends AbstractCleanable implements OnInit {
  @Input()
  threadCategory: Optional<ThreadCategory>;

  @Output()
  threadSubmitted = new EventEmitter<Thread>();

  replyFormGroup: Optional<FormGroup>;

  constructor(private readonly formBuilder: FormBuilder) {
    super();
  }

  // TODO: Build form
  ngOnInit(): void {
    this.replyFormGroup = this.formBuilder.group({
      topic: new FormControl(''),
    });
  }

  onSubmit(): void {
    const thread = this.getThreadFromForm();
    this.threadSubmitted.emit(thread);
  }

  private getThreadFromForm(): Thread {
    const form = this.getFormGroup();
    const category = this.getThreadCategory();
    const thread: Thread = form.value;
    thread.category = category;
    return thread;
  }

  private getThreadCategory(): ThreadCategory {
    return this.safeGetter(this.threadCategory, 'threadCategory');
  }

  getFormGroup(): FormGroup {
    return this.safeGetter(this.replyFormGroup, 'replyFormGroup');
  }
}
