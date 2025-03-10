import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly _token: string = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MjZFOTU5RTYzOEE5NjNFMDY4NTJBQ0RFNTNEQjY0OEJEMzhBNDVSUzI1NiIsIng1dCI6IlZTYnBXZVk0cVdQZ2FGS3MzbFBiWkl2VGlrVSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC9hdXRoIiwibmJmIjoxNzMyNzIxMjA1LCJpYXQiOjE3MzI3MjEyMDUsImV4cCI6MTczNTMxMzIwNSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFGREVNUyBBZG1pbiIsIkFGRVJCIFNwZWNpYWwgUHJvZ3JhbSBNYW5hZ2VyIiwiV29ya2NlbnRlciBBZG1pbiBMZWFkIiwiREUgQ2VudHJhbCBCb2FyZCBBZG1pbiIsIkFkbWluIiwiRGV2ZWxvcG1lbnQgUGxhbiBBZG1pbiIsIkFGRVJCIFNQRUVEIFByb2dyYW0gTWFuYWdlciIsIkVGTVAgQ2FzZSBNYW5hZ2VtZW50IFVzZXIiLCJBRkVSQiBBRklULUNJIE1hbmFnZXIiLCJERSBBZG1pbiAtIFJlc2VydmUiLCJBRkVSQiBBRklUIEFjYWRlbWljIENvZGluZyBNYW5hZ2VyIiwiU3VydmV5IEFkbWluIiwiQXNzaWdubWVudCBUZWFtIiwiQUZQQyBTUEVFRCBBZG1pbiIsIkFGRVJCIEFGSVQtRU4gTWFuYWdlciIsIkNGTSIsIlNlbmlvciBMZWFkZXIgTWFuYWdlciIsIkFFVEMgQUZFUkIgQWRtaW4iLCJGdW5jdGlvbmFsIERUIEJvYXJkIEFkbWluIiwiUmVwb3J0aW5nIE1hbmFnZXIiLCJFZm1wX0Fzc2lnbm1lbnROYXZpZ2F0b3IiLCJTeXN0ZW0gQWRtaW4iLCJFRk1QIENlbnRyYWwgQ2VsbCBNYW5hZ2VtZW50IiwiVXNlciIsIkxvc2luZyBDb21tYW5kZXIiLCJBc3NpZ25tZW50IFRlYW0gTWFuYWdlbWVudCBMZXZlbCIsIkNvb3JkaW5hdGlvbnMgV29ya2Zsb3cgQWRtaW4iLCJNUEYgUmVsb2NhdGlvbnMgQWRtaW4iLCJBRkVSQiBQcm9ncmFtIE1hbmFnZXIiLCJXb3JrY2VudGVyIEFkbWluIiwiV29ya2NlbnRlciBVc2VyIiwiU3VydmV5IFNwYWNlIEFkbWluIl0sInBlcnNvbmlkIjoiMTAiLCJhdXRoZW50aWNhdGlvbm1ldGhvZHVzZWQiOiJJbXBlcnNvbmF0aW9uIiwic2Vzc2lvbmlkIjoiMDQ2MDQ2NTEtMTg0MC00YmI4LWIwZTEtODA5MmFiNmZiNzY4IiwicGVyc29uaWRlbnRpZmllciI6ImQwNGM5ZGM3LWQyNWItNDg4Yy04YmVmLWExNDFiNzFhNWY1ZSIsImRvZGlkIjoiIiwibGFzdGxvZ2luZGF0ZSI6IjIwMjQtMTEtMjcgMTQ6NTk6MTAgXHUwMDJCMDAiLCJoYXNncm91cHMiOiJ0cnVlIn0.tdUHNLYam2gBbe6VBChuu2HBFvs0r_z-HcwafGHwNf8YwhKd78qeLmpN-czrkCLiBJcLPLiNJea8pm2P6Dviq9uTX59_t3RmsSEVAReo1spTswYKERQwOcYwSC5qvOiCz9L8jPoOsMn8vloXf54H46R1KmNehbCeAIY599T7zI6UoeSNlch-6WjrEx5OHESgPZXJ-sWPPFtGp2ToKNh13k6EMoPq7pmpQAoRgy2n0LbAEzZBxWKcICqGaIupBRaPJej_-i85fBDhOyLamjPbz-iiIa5m05EENJQ6CioQyqEraZf_d8DIfCVVlD0mHbuONlBrPUaiyITsidtKfkiZbQ'

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
