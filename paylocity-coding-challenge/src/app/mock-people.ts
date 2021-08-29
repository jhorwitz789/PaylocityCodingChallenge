import { Person } from "./Person";
import { PersonType } from "./PersonType";

export const PEOPLE: Person[] = [
    {
        id: 1,
        name: 'Jared Horwitz',
        benefitCost: 1000,
        type: PersonType.employee
    },
    {
        id: 2,
        name: 'Steve Rogers',
        benefitCost: 500,
        type: PersonType.dependent
    },
    {
        id: 3,
        name: 'Anthony Stark',
        benefitCost: 450,
        type: PersonType.dependent
    }
]