var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierPlayList');

var app = express();
app.use(bodyparser.json());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"); res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"); next();
});


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
    var objres = metier.getPlayList(idPlayList);

    //forger
    if ((typeof objres === 'undefined') || (typeof objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});



app.get('/api/playlists',function(req,res){
    var obj = metier.ajouterPlayList({"idPlaylist":0,"nomPlayList":"testpl1","nomCreateur":"user1","caractere":"Pop","listMorceau":"music1","listContributeur":"user1"});
    var obj2  = metier.getPlayList(0);
    var obj3 = metier.listerPlayList();
    res.send(obj3);
});


app.listen(3000,function (){
    console.log('Server running...');
});
