import {Component, ElementRef, OnDestroy} from '@angular/core';
import {IHeaderParams} from 'ag-grid-community';
import {IHeaderAngularComp} from 'ag-grid-angular';

@Component({
    templateUrl: 'checkbox-header.component.html'
})
export class CheckboxHeaderComponent implements OnDestroy, IHeaderAngularComp {
    public params: IHeaderParams;
    // public sorted: string;
    private elementRef: ElementRef;
    public selected = false;

    constructor(elementRef: ElementRef) {
        this.elementRef = elementRef;
    }

    agInit(params: IHeaderParams): void {
        this.params = params;
        this.params.column.addEventListener('selectionChanged', this.onSelectionChanged.bind(this));
    }

    ngOnDestroy() {
      console.log(`Destroying HeaderComponent`);
    }

    onSelectionChanged() {
        const selected = this.params.api.getSelectedRows().length;
        const rows = this.params.api.getDisplayedRowCount();
        if (selected === rows) {
          this.params.api.deselectAll();
          // this.selected = false;
        } else {
          this.params.api.selectAll();
          // this.selected = true;
        }
        console.log('click', selected, rows);
    }

}
