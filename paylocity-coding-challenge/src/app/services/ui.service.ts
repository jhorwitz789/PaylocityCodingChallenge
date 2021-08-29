import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddPerson: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddPerson(): void {
    this.showAddPerson = !this.showAddPerson;
    this.subject.next(this.showAddPerson);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
