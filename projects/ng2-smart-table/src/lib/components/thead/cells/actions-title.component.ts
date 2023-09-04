import {Component, Input, AfterViewInit, ElementRef, OnChanges, ChangeDetectionStrategy} from '@angular/core';

import { Grid } from '../../../lib/grid';

@Component({
  selector: '[ng2-st-actions-title]',
  template: `
    <div class="ng2-smart-title">{{ actionsColumnTitle }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTitleComponent implements AfterViewInit, OnChanges {

  @Input() grid: Grid;

  actionsColumnTitle: string;

  constructor(private ref: ElementRef) {
  }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add('ng2-smart-actions');
  }

  ngOnChanges() {
    console.log("changes to actions-title.component.ts");
    this.actionsColumnTitle = this.grid.getSetting('actions.columnTitle');
  }
}
