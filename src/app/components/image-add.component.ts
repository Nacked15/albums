import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-add',
    templateUrl: '../views/image-add.html',
    providers: [ ImageService ]
})

export class ImageAddComponent implements OnInit {
    public titleSection: string;
    public image: Image;
    public errorMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService
    ){
        this.titleSection = "Nueva Foto";
    }
    ngOnInit(){
        this.image = new Image("", "", "");
    }

    public onSubmit(){
        console.log(this.image);
        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.image.album = album_id;

            this._imageService.addImage(this.image).subscribe(
                response => {
                    if (!response.image) {
                        alert('Error desde el servidor');
                    } else {
                        this.image = response.image;
                        this._router.navigate(['/editar-imagen', response.image._id]);
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