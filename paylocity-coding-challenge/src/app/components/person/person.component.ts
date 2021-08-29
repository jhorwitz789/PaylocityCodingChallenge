import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from "../../Person";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() person!: Person
  @Output() onDeletePerson: EventEmitter<Person> = new EventEmitter()
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {}

  onDelete(person: Person) {
    this.onDeletePerson.emit(person);
  }
}
