import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatNameGetterComponent } from './chat-name-getter.component';

describe('ChatNameGetterComponent', () => {
  let component: ChatNameGetterComponent;
  let fixture: ComponentFixture<ChatNameGetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatNameGetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatNameGetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
