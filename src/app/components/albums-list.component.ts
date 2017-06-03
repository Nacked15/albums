import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html',
    providers: [ AlbumService ]
})

export class AlbumsListComponent implements OnInit {
    public titulo: string;
    public loading: boolean;
    public albums: Album[];
    public errorMessage;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _albumService: AlbumService
    ){
        this.titulo = "Listado de albums";
        this.loading = true;
    }
    ngOnInit(){
        this.titulo = 'Albums:';
        this.getAlbums();
    }

    getAlbums(){
        this._albumService.getAlbums().subscribe(
            result => {
                this.albums = result.albums;
                if (!this.albums) {
                    alert('Error en el Server');
                } else {
                    this.loading = false;
                }
            },
            error => {
               this.errorMessage = <any>error;
               if (this.errorMessage != null) {
                   console.log(this.errorMessage);
               }
            }
        );
    }

    onDeleteConfirm(id: string){
        // alert('click on delete btn: '+ id);
        this.confirmado = id;
    }

    onCancelConfirm(id){
        this.confirmado = null;
    }

    onDeleteAlbum(id){
        this._albumService.deleteAlbum(id).subscribe(
            result => {
                if (!result.album) {
                    alert('Error en la petición.');
                } else {
                   this.getAlbums();
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