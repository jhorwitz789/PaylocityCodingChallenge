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
  formattedBenefitCost!: string;

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  constructor() { }

  ngOnInit(): void {
    this.formattedBenefitCost = this.formatter.format(this.person.benefitCost);
  }

  onDelete(person: Person) {
    this.onDeletePerson.emit(person);
  }
}
