// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
var list = [];

//var listMorceau;
//var listContributeur;


//Constructor All attributes
function PlayList(nomPlayList, nomCreateur, caractere) {
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.caractere = caractere;
    this.listMorceau = [];
    this.listContributeur = [];
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
var ajouterPlayList = function(nomPlayList, nomCreateur, caractere) {
    const idPlayList = this.list.length;
    var playlist = new PlayList(nomPlayList, nomCreateur, caractere);
    this.list[idPlayList] = playlist;
    return idPlayList;
}


// Get a PlayList
var getPlayList = function (idPlaylist) {
    if (typeof list[idPlaylist] == 'undefined') return {};
    else {
        this.list[idPlaylist].incrementerNbClic(); //chaque fois getplaylist, nbClic++
        return list[idPlaylist];
    }
}

//lister les PlayLists
var listerPlayList = function () {
    return Object.values(list);
}


//incrementer nbClic
var incrementerNbClic = function (){
    this.nbClic++;
}

//
var ajouterMorceau = function (titre, artiste){
    this.listMorceau.tire = titre;
    this.listMorceau.artist = artiste

}

exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;
exports.ajouterMorceau = ajouterMorceau;
