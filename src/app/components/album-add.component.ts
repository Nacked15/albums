import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'albums-add',
    templateUrl: '../views/album-add.html',
    providers: [ AlbumService ]
})

export class AlbumAddComponent implements OnInit {
    public titleSection: string;
    public album: Album;
    public errorMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titleSection = "Nuevo Album";
    }
    ngOnInit(){
        this.album = new Album("", "", "");
    }

    public onSubmit(){
        console.log(this.album);

        this._albumService.addAlbum(this.album).subscribe(
            response => {
                if (!response.album) {
                    alert('Error desde el servidor');
                } else {
                    this.album = response.album;
                    this._router.navigate(['/album', this.album._id]);
                }
            },
            error => {
                this.errorMessage = <any>error;

                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }
}