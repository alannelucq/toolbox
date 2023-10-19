import { Directive, inject, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'form',
  standalone: true,
})
export class FormDirective {
  private readonly ngForm = inject(NgForm, {self: true});
  @Output() formValueChange = this.ngForm.form.valueChanges;
}
