import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Person } from "../Person";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = "http://localhost:5000/people";

  constructor(private client: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.client.get<Person[]>(this.apiUrl);
  }

  deletePerson(person: Person): Observable<Person> {
    const url = `${this.apiUrl}/${person.id}`;
    return this.client.delete<Person>(url);
  }

  addPerson(person: Person): Observable<Person> {
    return this.client.post<Person>(this.apiUrl, person, httpOptions);
  }
}
