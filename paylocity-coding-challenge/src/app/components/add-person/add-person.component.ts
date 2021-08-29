import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PersonType } from 'src/app/PersonType';
import { Person } from "../../Person";
import { UiService } from "../../services/ui.service"
import { Subscription } from "rxjs";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  @Output() onAddPerson: EventEmitter<Person> = new EventEmitter();
  name!: string;
  type: PersonType = PersonType.employee;
  hasDiscount: Boolean = false;
  cost: number = 0;
  showAddPerson!: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddPerson = value);
  }

  ngOnInit(): void {}

  onSubmit() {
    if(!this.name){
      alert("Please add a name!")
    }
    if(!this.type){
      alert("Please select a type!")
    }

    const newPerson: Person = {
      name: this.name,
      type: this.type,
      benefitCost: this.determineCost(this.name, this.type)
    }

    this.onAddPerson.emit(newPerson);

    this.name = "";
    this.type = PersonType.employee;
  }

  determineCost(name: String, type: PersonType): number {
    this.hasDiscount = name.startsWith("A");
    switch (+type) {
      case PersonType.employee:
        this.cost = 1000;
        break;
      case PersonType.dependent:
        this.cost = 500;
        break;
    }
    if(this.hasDiscount){this.cost -= this.cost*0.1}
    return this.cost;
  }
}
