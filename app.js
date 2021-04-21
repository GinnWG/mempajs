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

//Supprimer une playlist
app.delete('/api/playlists/delete/:idPlayList', function (req, res) {
    //recuperer parameter
    var idPlayList = req.params.idPlayList;
    //metier
    var objres = metierPlayList.supprimerPlayList(parseInt(idPlayList));
    var list = metierPlayList.listerPlayList();
    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(200).json(list);
    else res.status(404).json({});
});

/*
//Ajouter un Contributeur dans la Playlist
app.put('/api/playlists/edit/:idPlayList/:contributeur', function (req, res) {
    //recuperer parameter
    var idPlayList = parseInt(req.params.idPlayList);
    var contributeur = req.params.contributeur;
    //metier
    var objres = metierPlayList.ajouterUserInPlaylist(idPlayList, contributeur);
    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});

 */

//Ajouter un Contributeur et un Morceau dans la Playlist
app.put('/api/playlists/edit/:idPlayList/:contributor/:titre', function (req, res) {
    //recuperer parameter
    var idPlayList = parseInt(req.params.idPlayList);
    var contributor = req.params.contributor;
    var titre = req.params.titre;

    //metier
    var objres = metierPlayList.ajouterUserMorceauInPl(idPlayList, contributor, titre);
    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});

//Ajouter un Contributeur et un Morceau dans la Playlist
app.put('/api/playlists/edit/:idPlayList', function (req, res) {
    //recuperer parameter
    var idPlayList = parseInt(req.params.idPlayList);
   // var contributor = req.params.contributor;
   // var titre = req.params.titre;

    var data = req.body;
    var contributor = data.contributor;
    var titre = data.titre;
    //metier
    var objres = metierPlayList.ajouterUserMorceauInPl(idPlayList, contributor, titre);
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

//get Artiste par Titre



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
app.get('/api/user/:nomUser', function (req, res) {

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

