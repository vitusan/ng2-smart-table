import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from "@angular/core";

import { Grid } from "../../../lib/grid";

@Component({
  selector: "[ng2-st-actions-title]",
  template: ` <div class="ng2-smart-title">{{ actionsColumnTitle }}</div> `,
})
export class ActionsTitleComponent implements AfterViewInit {
  _grid: Grid;

  @Input() set grid(grid: Grid) {
    console.log("ActionsTitleComponent.set_grid()");
    this.actionsColumnTitle = grid.getSetting("actions.columnTitle");
    this._grid = grid;
  }

  actionsColumnTitle: string;

  constructor(private ref: ElementRef) {}

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add("ng2-smart-actions");
  }
}
