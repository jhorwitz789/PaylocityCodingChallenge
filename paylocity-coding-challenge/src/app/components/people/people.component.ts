import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from "../../services/person.service"
import { Person } from "../../Person";
import { CostSummaryComponent } from "../cost-summary/cost-summary.component"

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  @ViewChild(CostSummaryComponent) costSummaryChild!: CostSummaryComponent;
  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPeople().subscribe((people) => this.people = people);
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person).subscribe(() => {
      (this.people = this.people.filter((p) => p.id !== person.id))
      this.costSummaryChild.calculateAmounts();
    });
  }

  addPerson(person: Person) {
    this.personService.addPerson(person).subscribe((person) => {
      (this.people.push(person))
      this.costSummaryChild.calculateAmounts();
    });
  }
}