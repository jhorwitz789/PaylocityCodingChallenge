import {PersonType} from "../app/PersonType";

export interface Person{
    id?: number;
    name: string;
    benefitCost: number;
    type: PersonType;
}