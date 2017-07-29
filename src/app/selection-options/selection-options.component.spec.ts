import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionOptionsComponent } from './selection-options.component';

describe('SelectionOptionsComponent', () => {
  let component: SelectionOptionsComponent;
  let fixture: ComponentFixture<SelectionOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
