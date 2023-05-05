import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  

  constructor(private http: HttpClient) { }

  getAllPhotos():Observable<any>{
    var headers = this.getHeaders();
    return this.http.get<any>("http://localhost:8080/api/photos/getall",{headers});
  }

  getHeaders(){
    var headers ={
      'idToken': localStorage.getItem('userIdToken')
    };
    return headers;
  }
}
