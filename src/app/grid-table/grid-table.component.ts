import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { CheckboxHeaderComponent } from '../header/checkbox-header.component';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.css']
})
export class GridTableComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  gridApi;
  rowData: any;
  gridColumnApi;
  rowCount: string;
  isSelectionMode = false;
  selectedRowsLength = 0;
  count;

  frameworkComponents = {
    checkboxHeaderComponent: CheckboxHeaderComponent
  };

  columnDefs = [
    {
      headerName: '',
      field: 'checkbox',
      headerComponent: 'checkboxHeaderComponent',
      checkboxSelection: true,
      width: 50,
      hide: true,
      suppressToolPanel: true,
      suppressMovable: true
    },
    {
      headerName: 'thumbnails',
      field: 'snippet.thumbnails.default.url',
      cellRenderer: thumbnailsCellRenderer,
      suppressContextMenu: true
    },
    {
      headerName: 'published on',
      field: 'snippet.publishedAt',
      suppressContextMenu: true
    },
    {
      headerName: 'video title',
      field: 'snippet.title',
      cellRenderer: videoTitleCellRenderer
    },
    {
      headerName: 'description',
      field: 'snippet.description'
    }
  ];

  constructor(
    private youtubeServie: YoutubeService
  ) {
  }

  onSelectionChanged() {
    this.selectedRowsLength = this.agGrid.api.getSelectedRows().length;
  }

  selectAll() {
    this.isSelectionMode = !this.isSelectionMode;
    this.agGrid.columnApi.setColumnsVisible(['checkbox'], this.isSelectionMode);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.youtubeServie.get()
      .subscribe((data: any) => {
        this.rowData = data.items;

        this.count = this.rowData.length;
      });
  }

  isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn && this.isSelectionMode;
  }

  getContextMenuItems(params) {
    if (params.column.colId === 'snippet.title') {
      return [
        'copy',
        'copyWithHeaders',
        'paste',
        {
          name: 'Open in new tab',
          action: () => {
            window.open(`https://www.youtube.com/watch?v=${params.node.data.id.videoId}`);
          }
        },
      ];
    } else {
      return [];
    }
  }
}

function videoTitleCellRenderer(params) {
  return `<a href="https://www.youtube.com/watch?v=${params.data.id.videoId}" target="_blank">${params.data.snippet.title}</a>`;
}

function thumbnailsCellRenderer(params) {
  return `<img src=${params.data.snippet.thumbnails.default.url}>`;
}

