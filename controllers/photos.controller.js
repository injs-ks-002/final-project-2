const fs = require('fs')
const db = require('../config/db');
const Photo = require("../models/index").Photo;
const User = require("../models/index").User;
const jwt = require('jsonwebtoken');

exports.getPhoto = async (req, res) => {
    return Photo.findAll().then(photos=> {
        res.status(200).send({
            status : "SUCCES",
            data: photos
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            status : "FAIL",
            message : 'INTERNAL SERVER ERROR'
        })
    })
}

exports.postPhoto = async (req, res) => {
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const userId = req.id;

    await Photo.create({
        title: title,
        caption: caption,
        poster_image_url: poster_image_url,
        userId : userId
    })
    .then((photo) => {
        res.status(200).send({
           id: photo.id,
           title: photo.title,
           poster_image_url: photo.poster_image_url,
           caption: photo.caption,
           userId: photo.userId,
        })
    }).catch((e) => {
        console.log(e)
        res.status(503).json({
            message : "INTERNAL SERVER ERROR",
            error :e,
        })
    })
}

exports.updatePhoto = async (req, res) => {
    const photoId = req.params.photoId;
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const dataPhoto = {
        title,
        caption,
        poster_image_url,
    };
    await Photo.update(dataPhoto, {
        where : { id: photoId},
        returning: true,
    })
    .then((photo) => {
        res.status(200).json({
            photo: photo[1]
        })
    })
    .catch((error) => {
        console.log(error);
        res.status(503).json({
            message: "INTERNAL SERVER",
        });
    })
}


exports.deleteUser = (req, res) => {
    const photoId = req.params.photoId;
    Photo.destroy({
      where: {  id: photoId },
    })
    .then (() => {
        res.status(200).json({
            message: "Your Photo has been succesfully deleted",
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "INTERNAL SERVER",
            error: error,
        });
    })
}