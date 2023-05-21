import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Album } from 'app/Album';
import { AlbumService } from 'app/album.service';
import { file } from 'app/file';
import { FileService } from 'app/file.service';
import { PhotoService } from 'app/photo.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})

export class CreateAlbumComponent implements OnInit{
  albumTitle : string = '' ;

  constructor(private fileService: FileService,private albumService: AlbumService,private photoService:PhotoService){}

  ngOnInit(): void {   
  }
  createAlbum(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      const fileName: string = file.name;
      const fileType: string = file.type;
      const fileSize: number = file.size;

      console.log('File Name:', fileName);
      console.log('File Type:', fileType);
      console.log('File Size:', fileSize);
      

    this.fileService.uploadFile(file)
    .subscribe(
      fileResponse =>{
        var fileName = file.name;
        console.log("File data from service", fileResponse);
        this.saveAlbum(fileName);
      })
  } 
  
  }
  saveAlbum(fileName: string){
    this.albumService.saveAlbum(this.albumTitle,fileName);
    this.setFileName(fileName);
  }
  fileName:string = "";
  setFileName(fileName: string) {
    console.log(" from setter",fileName);
     this.fileName = fileName;
  }

  getFileName() {
    console.log("from getter",this.fileName);
    return this.fileName;
  }
  
  savePhoto(){
    console.log(this.albumService.getAlbumId1(),this.getFileName());
    this.photoService.savePhoto(this.albumService.getAlbumId1(),this.getFileName())
  }
}
