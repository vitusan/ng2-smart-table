import { Component } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  selector: "textarea-editor",
  styleUrls: ["./editor.component.scss"],
  template: `
    <textarea
      [ngClass]="inputClass"
      nbInput
      fieldSize="small"
      shape="semi-round"
      [(ngModel)]="cell.newValue"
      [name]="cell.getId()"
      [disabled]="!cell.isEditable()"
      [placeholder]="cell.getTitle()"
      (click)="onClick.emit($event)"
      (keydown.enter)="onEdited.emit($event)"
      (keydown.esc)="onStopEditing.emit()"
    >
    </textarea>
  `,
})
export class TextareaEditorComponent extends DefaultEditor {
  constructor() {
    super();
  }
}
