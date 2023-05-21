import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { photo } from 'app/photo';
import { PhotoService } from 'app/photo.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId?: string | null;
  photos!: photo[] ;
  photo: any;

  constructor(private route: ActivatedRoute,private photoService: PhotoService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.albumId = params.get('albumId');
      console.log('Got album Id:',this.albumId);
      if (this.albumId) {
        this.fetchPhotos();
      }
    })
  }
  fetchPhotos() {
    this.photoService.getAllPhotos().subscribe(
      response => {
        this.photos = <photo[]>response;
        console.log("Got all photos response",this.photos);
      }
    )
    return Response;
  }
  

}
