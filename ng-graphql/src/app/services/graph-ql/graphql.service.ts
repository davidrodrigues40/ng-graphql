import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { QueryPayload } from 'src/app/graphQl/models/query-payload';

@Injectable()
export class GraphQlService {
  private readonly _token: string = `Bearer ${localStorage.getItem('token')}`;

  constructor(private readonly _httpClient: HttpClient) { }

  Query(query: QueryPayload, url: string): Observable<any> {
    if (!localStorage.getItem('token'))
      localStorage.setItem('token', `eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1MjZFOTU5RTYzOEE5NjNFMDY4NTJBQ0RFNTNEQjY0OEJEMzhBNDVSUzI1NiIsIng1dCI6IlZTYnBXZVk0cVdQZ2FGS3MzbFBiWkl2VGlrVSIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL2xvY2FsaG9zdC9hdXRoIiwibmJmIjoxNzQxMzc3MjU5LCJpYXQiOjE3NDEzNzcyNTksImV4cCI6MTc0Mzk2OTI1OSwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkRFIEFkbWluIC0gUmVzZXJ2ZSIsIkRFIENlbnRyYWwgQm9hcmQgQWRtaW4iLCJEZXZlbG9wbWVudCBQbGFuIEFkbWluIiwiRUZNUCBDYXNlIE1hbmFnZW1lbnQgVXNlciIsIkVGTVAgQ2VudHJhbCBDZWxsIE1hbmFnZW1lbnQiLCJFZm1wX0Fzc2lnbm1lbnROYXZpZ2F0b3IiLCJGdW5jdGlvbmFsIERUIEJvYXJkIEFkbWluIiwiU3VydmV5IEFkbWluIiwiQWRtaW4iLCJBRVRDIEFGRVJCIEFkbWluIiwiQUZERU1TIEFkbWluIiwiQUZFUkIgQUZJVCBBY2FkZW1pYyBDb2RpbmcgTWFuYWdlciIsIkFGRVJCIEFGSVQtQ0kgTWFuYWdlciIsIkFGRVJCIEFGSVQtRU4gTWFuYWdlciIsIkFGRVJCIFByb2dyYW0gTWFuYWdlciIsIkFGRVJCIFNwZWNpYWwgUHJvZ3JhbSBNYW5hZ2VyIiwiQUZFUkIgU1BFRUQgUHJvZ3JhbSBNYW5hZ2VyIiwiQUZQQyBTUEVFRCBBZG1pbiIsIkFzc2lnbm1lbnQgVGVhbSIsIkFzc2lnbm1lbnQgVGVhbSBNYW5hZ2VtZW50IExldmVsIiwiQ0ZNIiwiQ29vcmRpbmF0aW9ucyBXb3JrZmxvdyBBZG1pbiIsIkxvc2luZyBDb21tYW5kZXIiLCJNUEYgUmVsb2NhdGlvbnMgQWRtaW4iLCJSZXBvcnRpbmcgTWFuYWdlciIsIlNlbmlvciBMZWFkZXIgTWFuYWdlciIsIlN5c3RlbSBBZG1pbiIsIlVzZXIiLCJXb3JrY2VudGVyIEFkbWluIExlYWQiLCJXb3JrY2VudGVyIEFkbWluIiwiV29ya2NlbnRlciBVc2VyIiwiU3VydmV5IFNwYWNlIEFkbWluIl0sInBlcnNvbmlkIjoiMTAiLCJhdXRoZW50aWNhdGlvbm1ldGhvZHVzZWQiOiJJbXBlcnNvbmF0aW9uIiwic2Vzc2lvbmlkIjoiZDBmZjcyYzctOTg2Ni00YzZhLTgyOWYtMjYyNTIyYTZhMzZmIiwicGVyc29uaWRlbnRpZmllciI6ImQwNGM5ZGM3LWQyNWItNDg4Yy04YmVmLWExNDFiNzFhNWY1ZSIsImRvZGlkIjoiIiwibGFzdGxvZ2luZGF0ZSI6IjIwMjUtMDMtMDYgMjM6MDc6MTYgXHUwMDJCMDAiLCJoYXNncm91cHMiOiJ0cnVlIn0.GdIeypFEgfqscGSdfLVovyZRWo5voynvxsFOVaEiuCfodlSZRXCcgKUDc4Kw493qI24WiU6ZVMWFEvApuWhCOwHOI6I8nw-zgGWec7TU6lNb9siS8qoj7NDtNSUquWa003IM-jLDlKRxIpXPnzfZHLR4R73q75kCoYjMzeWZmbss-jPveJ9HytNDpIDR5Fp-Qm5F_PUOcKT5oeR53oHs6a6QcBrcdwKiyV7x5Gt5qUb_xyNXCIZnHExwySWgVVfEnvFg2ehApfr1y1FaNUyITOILmj0PWkBv818aWHlzz4AsqqsfYNejl3srpGBN1P_rY_gYJLGXbDwtsI9guTa8Yw`)
    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': this._token,
      'Content-Type': 'application/json',
    });

    const options = {
      headers: headers
    }
    return this._httpClient.post<any>(url, query, options)
      .pipe(
        map(response => response.data)
      );
  }
}
