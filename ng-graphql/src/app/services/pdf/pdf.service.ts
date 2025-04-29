import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly _token: string = '';

  constructor(private readonly _httpClient: HttpClient) { }

  getPersonById(id: number): Observable<Person> {
    const url = 'https://localhost/PersonApi/api/v4/person/open-search';
    const request: SearchRequest = {
      pageSize: 1,
      pageNumber: 1,
      searchType: 0,
      query: [
        {
          operator: 0,
          field: "id",
          value: "38811"
        }
      ]
    };
    return this._httpClient.post<Person>(
      url,
      request,
      {
        headers: { 'Authorization': this._token, 'Accept-Type': 'application/json' }
      });
  }
}

export interface SearchRequest {
  pageSize: number,
  pageNumber: number,
  searchType: number,
  query: Query[]
}

export interface Query {
  operator: number;
  field: string;
  value: string;
}
