// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
const metierUser = require("./metierUser");
const list = [];
var idc = 0;
var listU = [];


//Constructor pour la version 1, nomPlayliste, nomCreateur, listMorceau => "creer une playliste et proposer des titres"
function PlayList(nomPlayList, nomCreateur, caractere, idPlayList) {
    this.idPlayList = idPlayList;
    this.nomPlayList = nomPlayList;
    this.nomCreateur = nomCreateur;
    this.nbClic = 0;
    this.listMorceau = [];
    this.listContributeur = [];
    this.caractere = caractere;
    this.datemisajour = new Date();
}

// get idPlayList just of IDPlaylist
/*
var getID = function (playlist) {
    return playlist.idPlayList;
}

 */

//ajouter PlayList version 1
var ajouterPlayList = function (playlist) {
    let idPlayList;

    idPlayList = idc;
    idc++;
    list[list.length] = new PlayList(playlist.nomPlayList, playlist.nomCreateur, playlist.caractere, idPlayList);
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
            if (playList.nomPlayList.indexOf(nomPlaylist) !== -1) {
                return true
            }
        })
    }
    if (nomCreateur) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.nomCreateur.indexOf(nomCreateur) !== -1) {
                return true
            }
        })
    }
    if (style) {
        resPlayLists = resPlayLists.filter(playList => {
            if (playList.caractere.indexOf(style) !== -1) {
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
/*
// ajouter un User dans la Playlist
var ajouterUserInPlayList = function (idPlaylist, nomUser) {
    // vérifie qu'il n'existe pas déjà
    if (estPresent(nomUser)){
        if (!estExist(nomUser))
            // crée User
            metierUser.ajouterUserbyName(nomUser);
            // l'ajoute a la list User
            // metierUser.listerUser().push(nomUser);
            // on renvoie vrai
            // return true;

        let position = getposition(idPlaylist);
        if (position !== -1) {
            // console.log(nomUser);
            // console.log(titre);
           // list[position].listMorceau.push(titre);
             list[position].listContributeur.push(nomUser)
            return list[position];
        }
    }
}
*/


// save
var ajouterUserMorceauInPl = function (idPlaylist, nomUser, titre) {
    // vérifie qu'il n'existe pas déjà
    if (estPresent(nomUser) && estPresent(titre)) {
        if (!estExist(nomUser))
            // crée User
            metierUser.ajouterUserbyName(nomUser);
        // l'ajoute a la list User
        //  metierUser.listerUser().push(user);
        // on renvoie vrai
        // return true;

        let position = getposition(idPlaylist);
        if (position !== -1) {
            // console.log(nomUser);
            // console.log(titre);
            list[position].listMorceau.push(titre);
            list[position].listContributeur.push(nomUser)
            return list[position];
        }
    }
    return -1;
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

exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;
exports.searchPlayList = searchPlayList;
exports.getPlayListbyUsername = getPlayListbyUsername;
exports.supprimerPlayList = supprimerPlayList;
//exports.ajouterUserInPlayList = ajouterUserInPlayList;
//exports.ajouterMorcerauInPlayList = ajouterMorcerauInPlayList;
exports.ajouterUserMorceauInPl = ajouterUserMorceauInPl;
exports.getPlayListByCreateur = getPlayListByCreateur;
exports.getPlayListByStyle = getPlayListByStyle;
exports.estPresent = estPresent;

