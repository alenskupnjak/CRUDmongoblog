import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDaNeComponent } from './dialog-da-ne.component';

describe('DialogDaNeComponent', () => {
  let component: DialogDaNeComponent;
  let fixture: ComponentFixture<DialogDaNeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDaNeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDaNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
