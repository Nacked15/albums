import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'album-detail',
    templateUrl: '../views/album-detail.html',
    providers: [AlbumService, ImageService] 
})
 
export class AlbumDetailComponent implements OnInit {
    public album: Album;
    public images: Image[];
    public api_url: string;
    public errorMessage;

    constructor(
        private _albumService: AlbumService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService,
    ){}

    ngOnInit(){
        this.api_url = this._imageService.getApiUrl('get-image/');
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
                    } else {
                        this._imageService.getImages(response.album._id).subscribe(
                            result => {
                                this.images = result.images;

                                if (!this.images) {
                                    alert('Sin imagenes');
                                }
                            },
                            error => {
                                this.errorMessage = <any>error;

                                if(this.errorMessage != null){
                                    console.log(this.errorMessage);
                                }
                            }
                        );
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