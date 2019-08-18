import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CheckboxHeaderComponent } from './header/checkbox-header.component';
import { GridTableComponent } from './grid-table/grid-table.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture, component;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        AgGridModule.withComponents([
          CheckboxHeaderComponent
        ])
      ],
      declarations: [
        AppComponent,
        GridTableComponent,
        CheckboxHeaderComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('the application should render', () => {
    expect(component).toBeDefined();
  });

  it('the grid cells should be as expected', () => {
    const appElement = fixture.nativeElement;

    const cellElements = appElement.querySelectorAll('.ag-header-cell');
    expect(cellElements.length).toEqual(4);
  });

});
