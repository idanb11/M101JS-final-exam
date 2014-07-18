var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB
var _ = require('lodash');

MongoClient.connect('mongodb://localhost:27017/photosharing', function(err, db) {
  "use strict";
  if(err) throw err;

  var listImagesInAllAlbums = [];
  var listAllImages = [];
  var listOrphanImages = [];

  console.log('Connected to db - Start running');

  db.collection('albums').find().toArray(function(err, albums){
    if (err) throw err;

    albums.forEach(function(album) {
      listImagesInAllAlbums = listImagesInAllAlbums.concat(album.images);

    });
  });

	db.collection('images').find().toArray(function(err, images){
    if (err) throw err;

    listImagesInAllAlbums = _.uniq(listImagesInAllAlbums);

    images.forEach(function(image) {
      listAllImages.push(image._id);
      if (listImagesInAllAlbums.indexOf(image._id) == -1) {
        db.collection('images').remove({_id: image._id}, function(err, deleted) {
          if (err) throw err;
          console.log("deleted - " + deleted);
        });
      }

    });
    //console.log(listImagesInAllAlbums);
    //console.log(listOrphanImages);
    //listOrphanImages = _.difference(listAllImages,listImagesInAllAlbums);
    //console.log(listImagesInAllAlbums);
    //console.log(listAllImages);
    console.log(listOrphanImages.length);


  });




});
