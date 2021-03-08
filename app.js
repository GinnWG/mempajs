var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierPlayList');

var app = express();
app.use(bodyparser.json());

//ajouter client
app.post('/api/playlists', function(req,res){
   //recuperer parameter
    var playlist = req.body;

    //metier
    var objres = metier.ajouterPlayList(playlist);

    //forger
    if ((typeof objres === 'undefined') || (typeof objres === {}))
        res.status(400).json({});
    else res.status(201).json(objres);
});

//lister les clients
app.get('/api/playlists', function(req,res){
    res.status(200).json(metier.listerPlayList());
});

//Rechercher
app.get('/api/playlists/{idPlayList}', function(req,res){

    //recuperer parameter
    var idPlayList = req.params.idPlaylist;

    //metier
    var obj = metier.getPlayList(idPlayList);

    //forger
    if ((typeof obj === 'undefined') || (typeof obj === {}))
        res.status(404).json({});
    else res.status(200).json(obj);
});

app.listen(3000,function (){
    console.log('Server running...');
});
