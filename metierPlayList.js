// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
const list = [];

var listC = [];
var listCaractere = [];

//Constructor pour la version 1, nomPlayliste, nomCreateur, listMorceau => "creer une playliste et proposer des titres"
function PlayList(nomPlayList, nomCreateur, listMorceau, idPlaylist) {
    this.idPlaylist = idPlaylist;
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.listMorceau = listMorceau;
    this.listContributeur = "";
    this.caractere = "";
    this.datemisajour = new Date();
}

//Methodes Metier
/*
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
*/

//ajouter PlayList version 1
var ajouterPlayList = function (playlist) {
    const idPlayList = list.length;
    list[idPlayList] = new PlayList(playlist.nomPlayList, playlist.nomCreateur, playlist.listMorceau,idPlayList);
    return list[idPlayList];

}


// Get a PlayList
var getPlayList = function (idPlaylist) {
    if (typeof list[idPlaylist] === 'undefined') return {};
    else {
        list[idPlaylist].incrementerNbClic(); //chaque fois getplaylist, nbClic++
        return list[idPlaylist];
    }
}

//lister les PlayLists
var listerPlayList = function () {
    return Object.values(list);
}


//incrementer nbClic
var incrementerNbClic = function () {
    this.nbClic++;
}

//


exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;

