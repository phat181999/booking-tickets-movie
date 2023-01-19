import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTemplatesComponent } from './page-templates.component';

describe('PageTemplatesComponent', () => {
  let component: PageTemplatesComponent;
  let fixture: ComponentFixture<PageTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTemplatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
