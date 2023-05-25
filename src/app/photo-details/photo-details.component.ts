import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from 'app/photo.service';
import { UserService } from 'app/user.service';

import { photo } from '../photo';
import { CommentService } from 'app/comment.service';
import { comment } from 'app/comment';
import { user } from 'app/user';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photo = new photo();
  photoId!: string;
  photos: photo[] | undefined;
  comment!: comment;
  commentInput: any;
  user1 = new user("", "", "", "");
  comments!: comment[] ;
  constructor(
    private commentService: CommentService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe((userProfile: user) => {
      this.user1 = <user>userProfile;
      console.log("Got User Profile", this.user1);
      this.userService.setuserName(this.user1.name);
    });

    this.photoService.getAllPhotos().subscribe((response) => {
      this.photos = <photo[]>response;
      console.log("Got all photo response", this.photos);
    });

    this.route.paramMap.subscribe((params) => {
      this.photoId = params.get('photoId') ?? '';
      console.log('Got photo ID:', this.photoId);

      if (this.photoId) {
        this.photoService.getPhotoById(this.photoId).subscribe((Response) => {
          this.photo = Response;
          console.log("got photo :", this.photo.photoUrl);
        });

        this.commentService.getCommentByPhotoId(this.photoId).subscribe((Response) => {
          this.comments = <comment[]>Response;
          console.log("got comments :", this.comments);
        });
      }
    });
  }

  saveComment(message: string, photoId: string) {
    this.commentService.saveComment(message, photoId, this.user1.name);
  }
  changeOrder(): void {
    this.comments.reverse(); // Reverse the order of comments
  }

  makeProfilePhoto() {
    var email = this.userService.getUserEmail();
    this.photoService.makeProfilePhoto(email, this.photo.photoUrl).subscribe((response) => {
      console.log("Profile photo Updated :)", response, this.photo.photoUrl);
    });
  }
}
