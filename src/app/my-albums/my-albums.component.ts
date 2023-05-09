import { Component, OnInit } from '@angular/core';
import { Album } from 'app/Album';
import { AlbumService } from 'app/album.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {


 albums: Album[] | undefined;


  constructor(private albumService: AlbumService){}

  ngOnInit(): void {
    this.albumService.getAllalbums().subscribe(
      response => {
        this.albums = <Album[]>response;
        console.log("Got all album response",this.albums);
      }
    )
    
  }
}
