import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FolderServiceService {

  private URL = "http://localhost:3000/api/folders";

  constructor(private http: HttpClient) { }

  getFolders(): Observable<any>{
    return this.http.get<any>(`${this.URL}`);
  }
}
