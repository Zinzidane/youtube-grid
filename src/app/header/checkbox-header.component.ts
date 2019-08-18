import {Component, ElementRef, OnDestroy} from '@angular/core';
import {IHeaderParams} from 'ag-grid-community';
import {IHeaderAngularComp} from 'ag-grid-angular';

@Component({
    templateUrl: 'checkbox-header.component.html'
})
export class CheckboxHeaderComponent implements OnDestroy, IHeaderAngularComp {
    public params: IHeaderParams;
    private elementRef: ElementRef;
    public selected = false;

    constructor(elementRef: ElementRef) {
      this.elementRef = elementRef;
    }

    agInit(params: IHeaderParams): void {
      this.params = params;
    }

    ngOnDestroy() {
      console.log(`Destroying HeaderComponent`);
    }

    onSelectionChanged() {
      const selected = this.params.api.getSelectedRows().length;
      const rows = this.params.api.getDisplayedRowCount();
      if (selected === rows) {
        this.params.api.deselectAll();
      } else {
        this.params.api.selectAll();
      }
    }

}
