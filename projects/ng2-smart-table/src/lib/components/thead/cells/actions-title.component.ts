import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
} from "@angular/core";

import { Grid } from "../../../lib/grid";

@Component({
  selector: "[ng2-st-actions-title]",
  template: ` <div class="ng2-smart-title">{{ actionsColumnTitle }}</div> `,
})
export class ActionsTitleComponent implements AfterViewInit, OnChanges {
  @Input() grid: Grid;

  actionsColumnTitle: string;

  constructor(private ref: ElementRef) {}

  ngOnChanges(): void {
    this.actionsColumnTitle = this.grid.getSetting("actions.columnTitle");
  }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add("ng2-smart-actions");
  }
}
