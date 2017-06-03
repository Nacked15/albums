import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-detail',
    templateUrl: '../views/image-detail.html',
    providers: [ImageService] 
})
 
export class ImageDetailComponent implements OnInit {
    public image: Image;
    public api_url: string;
    public errorMessage;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService,
    ){}

    ngOnInit(){
        this.api_url = this._imageService.getApiUrl('get-image/');
        this.getImage();
    }

    getImage() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._imageService.getImage(id).subscribe(
                response => {
                    this.image = response.image;

                    if (!this.image) {
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

    onDeleteConfirm(id: string){
        // alert('click on delete btn: '+ id);
        this.confirmado = id;
    }

    onCancelConfirm(){
        this.confirmado = null;
    }

    onDeleteImage(id){
        this._imageService.deleteImage(id).subscribe(
            result => {
                if (!result.image) {
                    alert('Error en la petición: eliminar foto.');
                } 
                this._router.navigate(['/album', result.image.album]);   
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