import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAllalbums():Observable<any>{
    var headers = this.getHeaders();
    return this.http.get<any>(environment.API_BASE_URL + "album/getall",this.getHeaders());
  }


  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}
