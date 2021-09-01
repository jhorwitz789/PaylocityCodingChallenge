import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PersonService } from "../../services/person.service"
import { Person } from "../../Person";
import { CostSummaryComponent } from "../cost-summary/cost-summary.component"
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnDestroy, OnInit {
  private readonly destroy$ = new Subject();
  @ViewChild(CostSummaryComponent) costSummaryChild!: CostSummaryComponent;
  people: Person[] = [];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personService.getPeople().pipe(takeUntil(this.destroy$)).subscribe((people) => this.people = people);
  }

  deletePerson(person: Person) {
    this.personService.deletePerson(person).pipe(takeUntil(this.destroy$)).subscribe(() => {
      (this.people = this.people.filter((p) => p.id !== person.id))
      this.costSummaryChild.calculateAmounts();
    });
  }

  addPerson(person: Person) {
    this.personService.addPerson(person).pipe(takeUntil(this.destroy$)).subscribe((person) => {
      (this.people.push(person))
      this.costSummaryChild.calculateAmounts();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}