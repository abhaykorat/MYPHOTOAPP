import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  

  constructor(private http: HttpClient) { }

  getAllPhotos():Observable<any>{
    var headers = this.getHeaders();
    return this.http.get<any>("http://localhost:8080/api/photos/getall",this.getHeaders());
  }

  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}
