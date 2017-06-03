'use strict'

var path  = require('path');
var Image = require('../models/image');
var Album = require('../models/album');

function getImage(req, res){
    var imageId = req.params.id;

    Image.findById(imageId, (err, image) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!image) {
                res.status(404).send({message: 'la imagen no existe'});
            }else{
                Album.populate(image, {path: 'album'}, (err, image) => {
                    if (err) {
                        res.status(500).send({message: 'Error en la petición.'});
                    } else {
                        res.status(200).send({image});
                    }
                });
                // res.status(200).send({image});
            }
        }
    });
}

function getImages(req, res){
    var albumId = req.params.album;
    if (!albumId) {
        var find = Image.find({}).sort('title');
    } else {
        var find = Image.find({album: albumId}).sort('title');
    }

    find.exec((err, images) =>{
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!images) {
                res.status(404).send({message: 'No hay imagenes'});
            }else{
                Album.populate(images, {path: 'album'}, (err, images) => {
                    if (err) {
                        res.status(500).send({message: 'Error en la petición.'});
                    } else {
                        res.status(200).send({images});
                    }
                });
            }
        }
    });
}

function saveImage(req, res){
    var image = new Image();
    var params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
        if (err) {
            res.status(500).send({message: 'Error al guardar'});
        } else {
            if (!imageStored) {
                res.status(404).send({message: 'No se ha guardado la imagen'});
            } else {
                res.status(200).send({image: imageStored});
            }
        }
    });
}

function updateImage(req, res){
    var imageId = req.params.id;
    var update  = req.body;

    Image.findByIdAndUpdate(imageId, update, (err, imageUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error al actualizar'});
        } else {
            if (!imageUpdated) {
                res.status(404).send({message: 'No se ha actualizado la imagen'});
            } else {
                res.status(200).send({image: imageUpdated});
            }
        }
    });
}

function deleteImage(req, res){
    var imageId = req.params.id;

    Image.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if (err) {
            res.status(500).send({message: 'Error al actualizar el album'});
        } else {
            if (!imageRemoved) {
                res.status(404).send({message: 'No se ha eliminado el album'});
            } else {
                res.status(200).send({image: imageRemoved});
            }
        }
    });
}

function uploadImage(req, res){
    var imageId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name  = file_split[1];

        // console.log(file_path);
        // console.log(file_name);
        Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdated) => {
            if (err) {
                res.status(500).send({message: 'Error al actualizar'});
            } else {
                if (!imageUpdated) {
                    res.status(404).send({message: 'No se ha actualizado la imagen'});
                } else {
                    res.status(200).send({image: imageUpdated});
                }
            }
        });

    } else {
        res.status(200).send({message: 'No se ha cargado ninguna imagen'});
    }
}

var fs = require('fs'); //fileSystem
function getImageFile(req, res){
    var imageFile = req.params.imageFile;

    fs.exists('./uploads/'+imageFile, function(exists){
        if (exists) {
            res.sendFile(path.resolve('./uploads/'+imageFile));
        } else {
            res.status(200).send({message: 'No existe la imagen!!'});
        }
    });
}

module.exports = {
    getImage,
    getImages,
    saveImage,
    updateImage,
    deleteImage,
    uploadImage,
    getImageFile

};