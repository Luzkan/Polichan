import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {Optional} from '../../../core/types/optional.model';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {EventEmitter} from '@angular/core';
import {AbstractCleanable} from '../../../core/cleanable/abstract-cleanable.component';
import {EntryFormData} from '../../models/form/base-form-data.model';
import {isNil} from 'lodash-es';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class EntryFormComponent extends AbstractCleanable implements OnInit {
  @Input()
  imageRequired = true;

  @Output()
  entrySubmitted = new EventEmitter<EntryFormData>();

  imageUrl: Optional<string>;

  replyFormGroup: Optional<FormGroup>;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly changeDetector: ChangeDetectorRef) {
    super();
  }

  isErrorVisible(controlName: string): boolean {
    const ctrl = this.replyFormGroup?.get(controlName) as FormControl;
    return isNil(ctrl) ? false : (ctrl.touched || ctrl.dirty) && ctrl.invalid;
  }

  ngOnInit(): void {
    const fileValidators = [this.createFileValidator()];
    const standardValidators = [Validators.required, this.createNoWhitespaceValidator(), Validators.maxLength(32)];
    const contentValidators = [Validators.required, this.createNoWhitespaceValidator(), Validators.maxLength(4096)];
    if (this.imageRequired) {
      fileValidators.push(Validators.required);
    }
    this.replyFormGroup = this.formBuilder.group({
      nickname: new FormControl('', standardValidators),
      password: new FormControl('', standardValidators),
      content: new FormControl('', contentValidators),
      imageFile: new FormControl(undefined, fileValidators),
    });
  }

  createNoWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = (control.value ?? '').trim().length !== 0;
      return isValid ? null : {'whitespace': true};
    };
  }

  createFileValidator(): ValidatorFn {
    const sizeLimit = 1024 * 1024 * 5;// 5MB
    const allowedTypes = ['image/jpeg', 'image/gif', 'image/png'];
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;
      const isValid = isNil(file) || file.size <= sizeLimit && allowedTypes.includes(file.type);
      return isValid ? null : {size: file.size, type: file.type};
    };
  }

  onSubmit(): void {
    const thread = this.getEntryFromForm();
    this.entrySubmitted.emit(thread);
  }

  private getEntryFromForm(): EntryFormData {
    return this.getFormGroup().value;
  }

  getFormGroup(): FormGroup {
    return this.safeGetter(this.replyFormGroup, 'replyFormGroup');
  }

  onFileChange(event: any) {
    const file = event.target?.files?.[0];
    this.imageUrl = file?.name;
    this.getFormGroup().patchValue({
      imageFile: file,
    });
    this.markForCheck();
  }

  markForCheck(): void {
    this.changeDetector.markForCheck();
  }

  fileInputTouched() {
    this.getFormGroup().get('imageFile')?.markAsTouched();
  }
}
