import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { flow } from 'lodash';
import { flatMap, filter } from 'lodash/fp';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder
    ) {}
  checklistState = [
    {
      label: 'Frodo Baggins',
      value: 'frodo_baggins',
      checked: false
    },
    {
      label: 'Samwise Gamgee',
      value: 'samwise_gamgee',
      checked: true,
    },
    {
      label: 'Merry Brandybuck',
      value: 'merry_brandybuck',
      checked: false
    }
  ];

form = this._formBuilder.group({
  checklist : new FormControl(this.flattenValues(this.checklistState))
});


checklist = this.form.get('checklist');

onChecklistChange(checked, checkbox) {
  checkbox.checked = checked;
  this.checklist.setValue(this.flattenValues(this.checklistState));
}

flattenValues(checkboxes) {
  const flattenedValues = flow([
    filter(checkbox => checkbox.checked),
    flatMap(checkbox => checkbox.value )
  ])(checkboxes)
  return flattenedValues.join(',');
}
onSubmit(){
  console.log(this.form);
  console.log('aaaaaaaaaaaaaaaa');
}

  ngOnInit() {
  }

}
