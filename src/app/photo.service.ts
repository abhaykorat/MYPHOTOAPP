import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { FileService } from './file.service';
import { photo } from './photo';
@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  photoId!: string ;


  constructor(private http: HttpClient,private fileService: FileService,private router:Router) { }
  ngOnInit(): void {
  }

  savePhoto(albumId: string, fileName: string){
    var photo: photo = {
      albumId: albumId,
      createdBy: "",
      dateCreated: "",
      id: "",
      photoUrl: environment.API_BASE_URL + "files/view?key=" + fileName 

    }
    this.http.post(environment.API_BASE_URL + "photos/save",photo,this.getHeaders())
        .subscribe(response =>{
          console.log('Photo Saved',response);
          this.router.navigate(['/photo',photo.id]);
        });
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
    return this.http.get<any>(environment.API_BASE_URL +"photos/getall");
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
