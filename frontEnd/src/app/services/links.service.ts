import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  private URL = "http://localhost:3000/api/links";

  getLinks(idFolder): Observable<any>{
    return this.http.get<any>(`${this.URL}/${idFolder}`);
  }
}
