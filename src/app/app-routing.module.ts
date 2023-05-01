import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { MyAlbumsComponent } from './my-albums/my-albums.component';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';
import { UploadPictureComponent } from './upload-picture/upload-picture.component';

const routes: Routes = [
{ path: 'profile/:profileId', component: ProfileComponent},
{ path: 'login', component: LoginComponent},
{ path: 'albums/me', component: MyAlbumsComponent},
{ path: 'create', component: CreateAlbumComponent},
{ path: 'album/:albumId', component: AlbumDetailsComponent},
{ path: 'upload/:albumId', component: UploadPictureComponent},
{ path: 'photo/:photoId', component: PhotoDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
