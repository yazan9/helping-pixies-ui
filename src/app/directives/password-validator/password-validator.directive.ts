import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validPassword][ngModel],[validPassword][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidator), multi: true }
  ]
})
export class PasswordValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasNumber = /\d/.test(password);
    if (!hasNumber || password.length < 6) {
      return { validPassword: true };
    }
    return null;
  }
}
