import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";

import { Cell } from "../../lib/data-set/cell";
import { DataSource } from "../../lib/data-source/data-source";
import { Grid } from "../../lib/grid";

@Component({
  selector: "[ng2-st-tbody]",
  styleUrls: ["./tbody.component.scss"],
  templateUrl: "./tbody.component.html",
})
export class Ng2SmartTableTbodyComponent implements OnChanges {
  @Input() grid: Grid;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() recycleConfirm: EventEmitter<any>;
  @Input() rowClassFunction: Function;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() recycle = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() edited = new EventEmitter<any>();
  @Output() userSelectRow = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();
  @Output() multipleSelectRow = new EventEmitter<any>();
  @Output() rowHover = new EventEmitter<any>();

  isMultiSelectVisible: boolean;
  showActionColumnLeft: boolean;
  showActionColumnRight: boolean;
  mode: string;
  editInputClass: string;
  isActionAdd: boolean;
  isActionEdit: boolean;
  isActionDelete: boolean;
  isActionRecycle: boolean;
  noDataMessage: boolean;

  get tableColumnsCount() {
    const actionColumns =
      this.isActionAdd ||
      this.isActionEdit ||
      this.isActionDelete ||
      this.isActionRecycle
        ? 1
        : 0;
    return this.grid.getColumns().length + actionColumns;
  }

  ngOnChanges() {
    this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
    this.showActionColumnLeft = this.grid.showActionColumn("left");
    this.mode = this.grid.getSetting("mode");
    this.editInputClass = this.grid.getSetting("edit.inputClass");
    this.showActionColumnRight = this.grid.showActionColumn("right");
    this.isActionAdd = this.grid.getSetting("actions.add");
    this.isActionEdit = this.grid.getSetting("actions.edit");
    this.isActionDelete = this.grid.getSetting("actions.delete");
    this.isActionRecycle = this.grid.getSetting("actions.recycle");
    this.noDataMessage = this.grid.getSetting("noDataMessage");
  }

  getVisibleCells(cells: Array<Cell>): Array<Cell> {
    return (cells || []).filter((cell: Cell) => !cell.getColumn().hide);
  }
}
