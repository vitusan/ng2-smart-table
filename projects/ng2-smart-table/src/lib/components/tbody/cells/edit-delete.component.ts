import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
} from "@angular/core";

import { Grid } from "../../../lib/grid";
import { Row } from "../../../lib/data-set/row";
import { DataSource } from "../../../lib/data-source/data-source";

@Component({
  selector: "ng2-st-tbody-edit-delete",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      href="#"
      *ngIf="isActionEdit"
      class="ng2-smart-action ng2-smart-action-edit-edit"
      [innerHTML]="editRowButtonContent"
      (click)="onEdit($event)"
    ></a>
    <a
      href="#"
      *ngIf="isActionDelete"
      class="ng2-smart-action ng2-smart-action-delete-delete"
      [innerHTML]="deleteRowButtonContent"
      (click)="onDelete($event)"
    ></a>
    <a
      href="#"
      *ngIf="isActionRecycle"
      class="ng2-smart-action ng2-smart-action-recycle-recycle"
      [innerHTML]="recycleRowButtonContent"
      (click)="onRecycle($event)"
    ></a>
  `,
})
export class TbodyEditDeleteComponent implements OnChanges {
  @Input() grid: Grid;
  @Input() row: Row;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() recycleConfirm: EventEmitter<any>;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() recycle = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();

  isActionEdit: boolean;
  isActionDelete: boolean;
  isActionRecycle: boolean;
  editRowButtonContent: string;
  deleteRowButtonContent: string;
  recycleRowButtonContent: string;

  onEdit(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.editRowSelect.emit(this.row);

    if (this.grid.getSetting("mode") === "external") {
      this.edit.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.edit(this.row);
    }
  }

  onDelete(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.grid.getSetting("mode") === "external") {
      this.delete.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.delete(this.row, this.deleteConfirm);
    }
  }

  onRecycle(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.grid.getSetting("mode") === "external") {
      this.recycle.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.recycle(this.row, this.recycleConfirm);
    }
  }

  ngOnChanges() {
    this.isActionEdit = this.grid.getSetting("actions.edit");
    this.isActionDelete =
      this.row.getData().hasOwnProperty("deletable") &&
      this.row.getData().deletable &&
      !this.row.getData().deleted &&
      this.grid.getSetting("actions.delete");
    this.isActionRecycle =
      this.row.getData().hasOwnProperty("deletable") &&
      this.row.getData().deleted &&
      this.grid.getSetting("actions.recycle");
    this.editRowButtonContent = this.grid.getSetting("edit.editButtonContent");
    this.deleteRowButtonContent = this.grid.getSetting(
      "delete.deleteButtonContent"
    );
    this.recycleRowButtonContent = this.grid.getSetting(
      "recycle.recycleButtonContent"
    );
  }
}
