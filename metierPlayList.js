// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
var list = [];

var idPlayList = 0;

//Constructor All attributes
function PlayList(idPlayList, nomPlayList, nomCreateur, caractere, listMorceau, listContributeur) {
    this.idPlaylist = idPlayList;
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.caractere = caractere;
    this.listMorceau = listMorceau;
    this.listContributeur = listContributeur;
    this.datemisajour = new Date();
}

//Constructor with structure
function PlayList(playlist) {
    this.idPlaylist = playlist.idPlaylist;
    this.nomPlayList = playlist.nomPlayList;
    this.nomCreateur = playlist.nomCreateur;
    this.nbClic = 0;
    this.caractere = playlist.caractere;
    this.listMorceau = playlist.listMorceau;
    this.listContributeur = playlist.listContributeur;
    this.datemisajour = new Date();
}


//Methodes Metier

//ajouter PlayList
var ajouterPlayList = function(playlist) {
    playlist.idPlaylist = idPlayList;
    list[idPlayList] = new PlayList(playlist);
    idPlayList++;
    return list[idPlayList-1];
}


// Get a PlayList
var getPlayList = function (idPlaylist) {
    if (typeof list[idPlaylist] == 'undefined') return {};
    else {
        this.list[idPlaylist].incrementerNbClic(); //chaque fois getplaylist, nbClic++
        return list[idPlaylist];}
}

//lister les PlayLists
var listerPlayList = function () {
    return Object.values(list);
}


//incrementer nbClic
var incrementerNbClic = function (){
    this.nbClic++;
}


exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic =incrementerNbClic;
