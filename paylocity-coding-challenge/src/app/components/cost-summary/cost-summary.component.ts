import { Component, OnInit } from '@angular/core';
import { PersonService } from "../../services/person.service"
import { Person } from "../../Person";

@Component({
  selector: 'app-cost-summary',
  templateUrl: './cost-summary.component.html',
  styleUrls: ['./cost-summary.component.css']
})
export class CostSummaryComponent implements OnInit {
  people: Person[] = [];
  deductionAmount: number = 0;
  netSalary: number = 52000;//base salary for all employees
  formattedDeduction!: string;
  formattedSalary!: string;

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.calculateAmounts();
  }

  calculateAmounts() {
    this.deductionAmount = 0;
    this.netSalary = 52000;
    this.personService.getPeople().subscribe((people) => {
      for (let person of people){
        this.deductionAmount += person.benefitCost;
      }
      this.netSalary -= this.deductionAmount;
      this.deductionAmount /= 26;//26 paychecks per year

      this.formattedDeduction = this.formatter.format(this.deductionAmount);
      this.formattedSalary = this.formatter.format(this.netSalary);
    });
  }
}