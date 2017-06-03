import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
 
@Component({
    selector: 'album-edit',
    templateUrl: '../views/album-add.html',
    providers: [AlbumService]
})
 
export class AlbumEditComponent implements OnInit {
    public titleSection: string;
    public album: Album;
    public errorMessage;

    constructor(
        private _albumService: AlbumService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titleSection = 'Editar Marcador.'
    }

    ngOnInit(){
        this.album = new Album("", "", "");
        this.getAlbum();
    }

    getAlbum() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(id).subscribe(
                response => {
                    this.album = response.album;

                    if (!this.album) {
                       this._router.navigate(['/']);
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
        });
    }

    public onSubmit(){
        console.log(this.album);

        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._albumService.editAlbum(id, this.album).subscribe(
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
        });
    }
 }