import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-item-form.component.html',
  styleUrl: './new-item-form.component.scss'
})
export class NewItemFormComponent {


  form = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required)
  })

  onSubmit() {
    if (this.form.valid) {

      console.log(this.form.value)
    }
  }

}
