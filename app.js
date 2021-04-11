var express = require('express');
var bodyparser = require('body-parser');
var metierPlayList = require('./metierPlayList');
var url = require("url")
var metierMorceau = require('./metierMorceau');
var metierUser = require('./metierUser');

var app = express();
app.use(bodyparser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


//------- Metier Playlist ----------

//ajouter client playlist
app.post('/api/playlists', function (req, res) {
    //recuperer parameter
    var playlist = req.body;

    //metier
    var objres = metierPlayList.ajouterPlayList(playlist);
    console.log(objres);

    //forger
    if ((typeof objres === 'undefined') || (typeof objres === {})) {
        res.status(400).json({});
    } else res.status(201).json(objres);
});

//lister les clients playlist
app.get('/api/playlists', function (req, res) {
    res.status(200).json(metierPlayList.listerPlayList());
});


//search playlist with filters
app.get('/api/playlists/search', function (req, res) {
    //filters
    var nomPlayList = req.query.nomPlayList;
    var caractere = req.query.caractere;
    res.status(200).json(metierPlayList.searchPlayList(nomPlayList, caractere));
});

//Rechercher playlist
app.get('/api/playlists/:idPlayList', function (req, res) {

    //recuperer parameter
    var idPlayList = req.params.idPlayList;

    //metier
    var objres = metierPlayList.getPlayList(idPlayList);

    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});


//------- Metier Morceau -----------

//ajouter client Morceau
app.post('/api/morceau', function (req, res) {
    //recuperer parameter
    var morceau = req.body;

    //metier
    var objres = metierMorceau.ajouterMorceau(morceau);
    console.log(objres);

    //forger
    if ((typeof objres === 'undefined') || (typeof objres === {})) {
        res.status(400).json({});
    } else res.status(201).json(objres);
});

//lister les clients Morceau
app.get('/api/morceau', function (req, res) {
    res.status(200).json(metierMorceau.listerMorceau());
});

//search Morceau with filters
app.get('/api/playlists/searchmorceau', function (req, res) {
    //filters
    var titre = req.query.titre;
    var artiste = req.query.artiste;
    res.status(200).json(metierMorceau.searchMorceau(titre, artiste));
});


//---------- Metier User ----------

//lister les clients Users
app.get('/api/user', function (req, res) {
    res.status(200).json(metierUser.listerUser());
});

//ajouter les clients an User
app.post('/api/user', function (req, res) {
    //recuperer parameter
    var user = req.body;

    //metier
    var objres = metierUser.ajouterUser(user);
    console.log(objres);

    //forger
    if ((typeof objres === 'undefined') || (typeof objres === {})) {
        res.status(400).json({});
    } else res.status(201).json(objres);
});

// get un user par nomUser
app.get('/api/user/:' +
    'nomUser', function (req, res) {

    //recuperer parameter
    var nomUser = req.params.nomUser;

    //metier
    var objres = metierUser.getUser(nomUser);

    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});


app.listen(3000, function () {
    console.log('Server running...');
});

/*
app.get('/',function(req,res){
    var obj = metierPlayList.ajouterPlayList({"idPlaylist":0,"nomPlayList":"testpl1","nomCreateur":"user1","caractere":"Pop","listMorceau":"music1","listContributeur":"user1"});
    var obj2  = metierPlayList.getPlayList(0);
    var obj3 = metierPlayList.listerPlayList();
    res.send(obj3);
   // res.json(obj3)
});
*/

/*
app.get('/', function (req, res) {
    var obj = metierPlayList.ajouterPlayList({
        "nomPlayList": "testpl1",
        "nomCreateur": "user1",
        "listMorceau": "music1",
    });
    var obj2 = metierPlayList.getPlayList(1);
    var obj3 = metierPlayList.listerPlayList();
    res.send(obj3);
    res.json(obj3)
});
*/
