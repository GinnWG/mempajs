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
    console.log(playlist);
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
    var nomCreateur = req.query.nomCreateur;
    var caractere = req.query.caractere;
    res.status(200).json(metierPlayList.searchPlayList(nomPlayList, nomCreateur, caractere));
});

//Rechercher playlist
app.get('/api/playlists/:idPlayList', function (req, res) {

    //recuperer parameter
    var idPlayList = req.params.idPlayList;

    //metier
    var objres = metierPlayList.getPlayList(idPlayList);

    // forger
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

//Ajouter un Contributeur et un Morceau dans la Playlist
app.put('/api/playlists/edit/:idPlayList', function (req, res) {
    console.log('==============');
    console.log(req.body);
    console.log(req.body["idmusic"]);
    //recuperer parameter
    var idPlayList = parseInt(req.params.idPlayList);
    let contributor = req.body["newcontributor"];
    let titre = req.body["newtitle"];
    let idMusic = req.body["idmusic"];

    if (metierPlayList.estPresent(idPlayList) && metierPlayList.estPresent(contributor) && metierPlayList.estPresent(titre)) {
        // metier
        var objres = metierPlayList.ajouterUserMorceauInPl(idPlayList, contributor, titre, idMusic);
        console.log(contributor);
        console.log(titre);
        console.log(idMusic);
        // var objres2 = metierPlayList.ajouterMorcerauInPlayList(idPlayList,titre);

    }
    //forger
    if ((typeof objres === 'undefined') || (objres === {}) )
        // (typeof objres2 === 'undefined') || (objres2 === {})
        res.status(404).json({});
    else {
        res.status(200).json(objres);
       // res.status(200).json(objres2);
    }
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

//----------- Version 4 -----------

//Rechercher playlist par créateur
app.get('/api/playlists/parCreateur/:idUser', function (req, res) {

    //recuperer parameter
    var idUser = req.params.idUser;

    //metier
    var objres = metierPlayList.getPlayListByCreateur(idUser);

    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});

//Rechercher playlist par style
app.get('/api/playlists/parStyle/:caractere', function (req, res) {

    //recuperer parameter
    var caractere = req.params.caractere;

    //metier
    var objres = metierPlayList.getPlayListByStyle(caractere);

    //forger
    if ((typeof objres === 'undefined') || (objres === {}))
        res.status(404).json({});
    else res.status(200).json(objres);
});

app.listen(3000, function () {
    console.log('Server running...');
});



