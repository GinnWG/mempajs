// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
const list = [];

var listC = [];


//Constructor pour la version 1, nomPlayliste, nomCreateur, listMorceau => "creer une playliste et proposer des titres"
function PlayList(nomPlayList, nomCreateur, caractere, idPlayList) {
    this.idPlayList = idPlayList;
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.listMorceau = "";
    this.listContributeur = "";
    this.caractere = caractere;
    this.datemisajour = new Date();
}

// get idPlayList just of IDPlaylist
var getID = function (playlist){
    return playlist.idPlayList;
}

//ajouter PlayList version 1
var ajouterPlayList = function (playlist) {
    let idPlayList;
    if (list.length === 0) {
        idPlayList = 0;
    } else {
        idPlayList = getID(list[list.length - 1]);
        idPlayList++;
    }
        list[idPlayList] = new PlayList(playlist.nomPlayList, playlist.nomCreateur, playlist.caractere, idPlayList);
        return list[idPlayList];
}

//incrementer nbClic
const incrementerNbClic = function (playlist) {
    playlist.nbClic++;
}

// Get a PlayList
var getPlayList = function (idPlayList) {
    if (typeof list[idPlayList] === 'undefined') return {};
    else {
        incrementerNbClic(list[idPlayList]); //chaque fois getplaylist, nbClic++
        return list[idPlayList];
    }
}
//Get PlayList by nomCreateur ---- Version 4
var getPlayListbyUsername = function (nomCreateur) {
    if (typeof list[nomCreateur] === 'undefined') return {};
    else {
     //   incrementerNbClic(list[nomCreateur]); //chaque fois getplaylist, nbClic++
        return list[nomCreateur];
    }
}

//lister les PlayLists
var listerPlayList = function () {
    return Object.values(list);
}

//find by style and nomPlayList
var searchPlayList = function (nomPlaylist, style) {
    //copy list to prevent modifications on list
    var resPlayLists = [...list];
    if (nomPlaylist){
        if(style){
            resPlayLists = resPlayLists.filter(playList => {
                if(playList.nomPlayList.indexOf(nomPlaylist) !== -1 && playList.caractere.indexOf(style) !== -1) {
                    return true
                }

            })
        }
    }
    if (nomPlaylist) {
        resPlayLists = resPlayLists.filter(playList => {
            if(playList.nomPlayList.indexOf(nomPlaylist) !== -1) {
                return true
            }
        })
    }
    if (style) {
        resPlayLists = resPlayLists.filter(playList => {
            if(playList.caractere.indexOf(style) !== -1) {
                return true
            }
        })
    }
    return resPlayLists;
}

exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;
exports.searchPlayList = searchPlayList;
exports.getPlayListbyUsername  = getPlayListbyUsername;



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
