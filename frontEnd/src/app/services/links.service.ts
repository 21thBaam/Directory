import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { LinkModel } from "../models/link-model";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  private URL = "http://localhost:3000/api/links";

  getLinks(idFolder): Observable<any>{
    return this.http.get<any>(`${this.URL}/${idFolder}`);
  }

  getLink(idLink: String): Observable<any>{
    return this.http.get<any>(`${this.URL}/getLink/${idLink}`);
  }

  addLink(link: LinkModel){
    return this.http.post<any>(`${this.URL}`, link);
  }

  deleteLink(link: LinkModel){
    return this.http.delete<any>(`${this.URL}/${link._id}`);
  }

  updateLink(link: LinkModel){
    return this.http.put<any>(`${this.URL}/${link._id}`, link);
  }
}
