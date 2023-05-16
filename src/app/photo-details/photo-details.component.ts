import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from 'app/photo.service';
import { UserService } from 'app/user.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  photo: any;
  photoId?: string | null;
  constructor(private photoService: PhotoService,private route: ActivatedRoute,private userService: UserService){}

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe(
      response => {
        console.log("Got all photo response",response);
      }
  
    )
    
    
    this.route.paramMap.subscribe(params => {
      this.photoId = params.get('photoId');
      console.log('Got photo ID:', this.photoId);

      if (this.photoId) {
        this.photoService.getPhotoById(this.photoId).subscribe(
          Response => {
            this.photo = Response;
            console.log("got photo :",this.photo);
          }
        );
      }
    });

  }
  makeProfilePhoto(){
    var email = this.userService.getUserEmail();
    this.photoService.makeProfilePhoto(email,this.photo.photoUrl).subscribe(
      response =>{

        console.log("Profile photo Updated :)",response,this.photo.photoUrl);
      }
    )
  }

}
