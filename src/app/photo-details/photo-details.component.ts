import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'app/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {
  constructor(private photoService: PhotoService){}

  ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe(
      response => {
        console.log("Got all photo response",response);
      }
    )
    
  }

}
