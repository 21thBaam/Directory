import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegistroComponent } from './login-registro.component';

describe('LoginRegistroComponent', () => {
  let component: LoginRegistroComponent;
  let fixture: ComponentFixture<LoginRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
