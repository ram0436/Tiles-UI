import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOrdersComponent } from './shared-orders.component';

describe('SharedOrdersComponent', () => {
  let component: SharedOrdersComponent;
  let fixture: ComponentFixture<SharedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
