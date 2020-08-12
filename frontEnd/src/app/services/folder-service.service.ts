import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { FolderModel } from "../models/folder-model";

@Injectable({
  providedIn: 'root'
})
export class FolderServiceService {

  private URL = "http://localhost:3000/api/folders";

  constructor(private http: HttpClient) { }

  getFolders(): Observable<any>{
    return this.http.get<any>(`${this.URL}`);
  }

  getFolder(idFolder: String): Observable<any>{
    return this.http.get<any>(`${this.URL}/${idFolder}`);
  }

  editFolder(folder: FolderModel){
    return this.http.put<any>(`${this.URL}/${folder._id}`, folder);
  }

  addFolder(folder: FolderModel){
    return this.http.post<any>(`${this.URL}`,folder);
  }

  deleteFolder(folder: FolderModel){
    return this.http.delete<any>(`${this.URL}/${folder._id}`);
  }
}
