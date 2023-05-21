import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Album } from './Album';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient,private router:Router) { }
  albumId! : string;
  albumId1: string ="";

  saveAlbum(albumTitle: string, fileName: string){
    var album: Album = {
      coverPhotoUrl: environment.API_BASE_URL + "files/view?key=" + fileName,
      createdBy: "",
      dateCreated: "",
      name: albumTitle,
      id: ''
    }
    this.http.post(environment.API_BASE_URL + "album",album)
        .subscribe(response =>{
          var album: Album = <Album>(response);
          this.setAlbumId1(album.id);
          console.log('Album Created',response);
        });
  }
  setAlbumId1(id: string) {
    console.log(" from setter",id);
     this.albumId1 = id;
  }

  getAlbumId1() {
    console.log("from getter",this.albumId1);
    return this.albumId1;
  }

  getAllalbums():Observable<any>{
    var headers = this.getHeaders();
    console.log("Calling get all albums method with headers " ,headers);
    return this.http.get<any>(environment.API_BASE_URL + "album/getall",this.getHeaders());
  }


  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}
