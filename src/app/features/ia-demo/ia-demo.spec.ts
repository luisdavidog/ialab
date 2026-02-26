import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IaDemo } from './ia-demo';

describe('IaDemo', () => {
  let component: IaDemo;
  let fixture: ComponentFixture<IaDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IaDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IaDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
