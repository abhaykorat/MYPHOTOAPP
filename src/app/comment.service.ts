import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { PhotoService } from './photo.service';
import { comment } from './comment';
import { UserService } from './user.service';
import { user } from './user';
import { NONE_TYPE } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  photoId!: string;

  constructor(private http: HttpClient,private userService:UserService,private photoService: PhotoService,private router:Router) { }
  ngOnInit(): void {
  }

  saveComment(message: string, photoId: string,userName: string){
    const Comment: comment = {
      createdBy : userName,
      id: "",
      message: message,
      photoId: photoId,
    }
    this.http.post(environment.API_BASE_URL + "comment/save",Comment,this.getHeaders())
        .subscribe(response =>{
          console.log('Comment Saved',response);
        });
  }
  
  getCommentByPhotoId(photoId: string):Observable<any>{
    this.photoId = photoId;
    return this.http.get<any>(environment.API_BASE_URL + "comment/getbyphotoid/" +  this.photoId ,this.getHeaders());
    
    
  }
  getHeaders(): { [header: string]: string | null } {
    const idToken = localStorage.getItem('userIdToken');
    return idToken ? { 'idToken': idToken } : {};
  }
}
