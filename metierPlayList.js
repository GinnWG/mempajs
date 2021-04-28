// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
const metierUser = require("./metierUser");
const metierMorceau = require("./metierMorceau");
const list = [];
var idc = 0;
var listU = [];
let listM = [];

// Function verify UserName Exist
var estExist = function (nomUser) {
    const listU = metierUser.listerUser();
    for (let i = 0; i < listU.length; i++) {
        if (nomUser === listU[i].nomUser)
            return true;
    }
    return false;
}

// Function de la verification
var estPresent = function (input) {
    return input !== undefined;
}

//Constructor pour la version 1, nomPlayliste, nomCreateur, listMorceau => "creer une playliste et proposer des titres"
function PlayList(nomPlayList, nomCreateur, caractere, idPlayList) {
    this.idPlayList = idPlayList;
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.listMorceau = [];
    this.listIDMusic = [];
    this.listContributeur = [];
    this.caractere = caractere;
    this.datemisajour = new Date();
}

//ajouter PlayList version 1
var ajouterPlayList = function (playlist) {
    let idPlayList;

    idPlayList = idc;
    idc++;
    list[list.length] = new PlayList(playlist.nomPlayList, playlist.nomCreateur, playlist.caractere, idPlayList);

    if (!estExist(playlist.nomCreateur)) {
        // create User
        metierUser.ajouterUserbyName(playlist.nomCreateur);
    }
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
        incrementerNbClic(list[idPlayList]);
        return list[idPlayList];
    }
}

//Get PlayList by nomCreateur ---- Version 4
var getPlayListbyUsername = function (nomCreateur) {
    if (typeof list[nomCreateur] === 'undefined') return {};
    else {
        return list[nomCreateur];
    }
}

//lister les PlayLists
var listerPlayList = function () {
    return Object.values(list);
}

//find by style and nomPlayList
var searchPlayList = function (nomPlaylist, nomCreateur, style) {
    //copy list to prevent modifications on list
    var resPlayLists = [...list];

    if (nomPlaylist && nomCreateur && style) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.nomPlayList.indexOf(nomPlaylist) !== -1 && playList.nomCreateur.indexOf(nomCreateur) !== -1 && playList.caractere.indexOf(style) !== -1) {
                return true
            }
        })
    }
    if (nomPlaylist) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.nomPlayList.toUpperCase().indexOf(nomPlaylist.toUpperCase()) !== -1) {
                return true
            }
        })
    }
    if (nomCreateur) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.nomCreateur.toUpperCase().indexOf(nomCreateur.toUpperCase()) !== -1) {
                return true
            }
        })
    }
    if (style) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.caractere.toUpperCase().indexOf(style.toUpperCase()) !== -1) {
                return true
            }
        })
    }
    return resPlayLists;
}

//Supprimer une playlist
var supprimerPlayList = function (idPlaylist) {

    for (var i = 0; i < list.length; i++) {
        if (idPlaylist === list[i].idPlayList) {
            list.splice(i, 1);
        }

    }
}

//get position of a playlist
var getposition = function (idPlaylist) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].idPlayList == idPlaylist)
            return i;
    }
    return -1;
}

/*
// ajouter un Contributeur dans la playlist
var ajouterUserInPlaylist = function (idPlaylist, nomUser) {
    let position = getposition(idPlaylist);
    if (position !== -1) {
        list[position].listContributeur.push(nomUser);
        return list[position].listContributeur;
    }
    // list[getposition(idPlaylist)].listContributeur.add(nomUser);
    //alert('Eh ! ça ne marche pas bien ton truc ! ');
}

// ajouter un Morceau dans la PlayList
var ajouterMorcerauInPlayList = function (idPlaylist, titre) {
    let position = getposition(idPlaylist);
    if (position !== -1) {
        list[position].listMorceau.push(titre);
        return list[position].listMorceau;
    }
}
 */


// ajouter un Morceau et un Contributeur dans la Playlist
var ajouterMorcerauInPlayList = function (idPlaylist, titre) {
    // vérifie qu'il n'existe pas déjà
    if (estPresent(titre)) {

        let position = getposition(idPlaylist);
        if (position !== -1) {
            // console.log(nomUser);
            // console.log(titre);
            list[position].listMorceau.push(titre);
            //list[position].listContributeur.push(nomUser)
            return list[position];
        }
    }
}

// Get a PlayList by creator
var getPlayListByCreateur = function (idUser) {
    let response = [];

    list.forEach(function (playlist) {
        if (playlist.nomCreateur === idUser) {
            response.push(playlist);
        }
    });

    return response;
}

// Get a PlayList by style
var getPlayListByStyle = function (caractere) {
    let response = [];

    list.forEach(function (playlist) {
        if (playlist.caractere === caractere) {
            response.push(playlist);
        }
    });

    return response;
}

// Get liste de tous les Morceaux
listM = metierMorceau.listerMorceau();


// Edit PlayList
var ajouterUserMorceauInPl = function (idPlaylist, nomUser, titre, idMusic) {
    // vérifie qu'il n'existe pas déjà
    let position = getposition(idPlaylist);
    let i = 0;
    let inlist = false;
    let inlistM = false;

    if (estPresent(nomUser) && estPresent(titre)) {
        console.log('test de validation');
        if (!estExist(nomUser)) {
            // create User
            metierUser.ajouterUserbyName(nomUser);

            if (position !== -1) {

                //ajoute Morceau
                i = 0;
                while (position !== -1 && i < list[idPlaylist].listIDMusic.length && !inlistM) {
                    console.log('idMorceau ' + list[idPlaylist].listIDMusic[i] + '   Music' + titre);
                    console.log(idMusic === list[idPlaylist].listIDMusic[i] + ' ' + idMusic + ' ' + list[idPlaylist].listIDMusic[i]);
                    if (idMusic === list[idPlaylist].listIDMusic[i]) {
                        console.log('inlistM ： ' + inlistM);
                        inlistM = true;
                    }
                    i++;
                }
                console.log(inlistM);
                if (position !== -1 && !inlistM) {
                    list[position].listMorceau.push(titre);
                    list[position].listIDMusic.push(idMusic);
                    list[position].listContributeur.push(nomUser);
                }
            }
        } else {
            while (position !== -1 && i < list[idPlaylist].listIDMusic.length && !inlistM) {
                console.log('list[idPlaylist].idMorceau[i] ' + list[idPlaylist].listIDMusic[i] + '   Music ' + titre);
                console.log('idMorceau ' + idMusic);
                if (idMusic === list[idPlaylist].listIDMusic[i]) {
                    console.log('inlistM: ' + inlistM);
                    inlistM = true;
                }
                i++;
            }
            if (position !== -1 && !inlistM) {
                list[position].listMorceau.push(titre);
                list[position].listIDMusic.push(idMusic);
                i = 0;
                while (position !== -1 && i < list[idPlaylist].listContributeur.length && !inlist) {
                    console.log('test while user')

                    if (list[idPlaylist].listContributeur[i] === nomUser) {
                        console.log(inlist + ' test user inlist');
                        inlist = true;
                    }
                    i++;
                }
                if (!inlist && position !== -1) {
                    list[position].listContributeur.push(nomUser);
                }
            }
        }
        return list[position];
    }
    return -1;
}

exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;
exports.searchPlayList = searchPlayList;
exports.getPlayListbyUsername = getPlayListbyUsername;
exports.supprimerPlayList = supprimerPlayList;
exports.getPlayListByCreateur = getPlayListByCreateur;
exports.getPlayListByStyle = getPlayListByStyle;
exports.estPresent = estPresent;
exports.ajouterUserMorceauInPl = ajouterUserMorceauInPl;
