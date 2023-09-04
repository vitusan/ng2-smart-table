import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
} from "@angular/core";

import { Grid } from "../../../lib/grid";

@Component({
  selector: "[ng2-st-actions-title]",
  template: ` <div class="ng2-smart-title">{{ actionsColumnTitle }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsTitleComponent implements AfterViewInit, OnChanges, OnInit {
  @Input() grid: Grid;

  actionsColumnTitle: string;

  constructor(
    private ref: ElementRef,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.grid.onUpdateSettingsSource.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add("ng2-smart-actions");
  }

  ngOnChanges() {
    this.actionsColumnTitle = this.grid.getSetting("actions.columnTitle");
  }
}
