import { Component, OnInit } from '@angular/core';
import { PersonService } from "../../services/person.service"
import { Person } from "../../Person";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPeople().subscribe((people) => this.people = people);
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person).subscribe(() => (this.people = this.people.filter((p) => p.id !== person.id)));
  }

  addPerson(person: Person) {
    this.personService.addPerson(person).subscribe((person) => (this.people.push(person)))
  }
}