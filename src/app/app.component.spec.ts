import { TaskService } from './task.service';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [FormsModule],
      providers: [TaskService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show default task in h2 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.nativeElement.textContent).toEqual('Task 1');
  });

  it('should keep input and h2 in sync -- with async method', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const inputDe = fixture.debugElement.query(By.css('input[name="title"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'Updated Task 1';
    inputEl.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const de = fixture.debugElement.query(By.css('h2'));
      expect(de.nativeElement.textContent).toEqual('Updated Task 1');
    });
  }));

  it('should keep input and h2 in sync -- with fakeAsync method', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const inputDe = fixture.debugElement.query(By.css('input[name="title"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'Updated Task 1';
    inputEl.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.nativeElement.textContent).toEqual('Updated Task 1');
  }));

  it('should display number of times title was updated by pressing enter button', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const taskService = fixture.debugElement.injector.get(TaskService);
    const spy = spyOn(taskService, 'update').and.returnValue(Promise.resolve('success'));
    fixture.detectChanges();
    const inputDe = fixture.debugElement.query(By.css('input[name="title"]'));
    const inputEl = inputDe.nativeElement;
    inputEl.value = 'Updated Task 1';
    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new KeyboardEvent('keydown', {
      'key': 'Enter'
    }));
    tick();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h2'));
    expect(de.nativeElement.textContent).toEqual('Updated Task 1');
    const updateCountDe = fixture.debugElement.query(By.css('h3'));
    expect(updateCountDe.nativeElement.textContent).toEqual('Updated: 1 times');
    expect(spy).toHaveBeenCalled();
  }));

});
