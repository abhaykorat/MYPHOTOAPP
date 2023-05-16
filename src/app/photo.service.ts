import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  photoId?: string | null;


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  makeProfilePhoto(emailId: string,photoUrl: string):Observable<any>{
    const params = new HttpParams()
    .set('emailId', emailId)
    .set('photoUrl', photoUrl);
    console.log("profile photo sent to user object",emailId,photoUrl);
  return this.http.put<any>(environment.API_BASE_URL + 'users/updateProfilePhoto', {}, { params });
}
  

  getAllPhotos():Observable<any>{
    var headers = this.getHeaders();
    return this.http.get<any>("http://localhost:8080/api/photos/getall");
  }
  getPhotoById(photoId: string):Observable<any>{
    this.photoId = photoId;
    return this.http.get<any>(environment.API_BASE_URL + "photos/byId/" + this.photoId,this.getHeaders());
    
  }

  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}
