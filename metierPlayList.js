// partie Metier du PlayList (back)

// list of playlist
//const PlayList = require('./Playlist');
const list = [];
var idc = 0;
var listC = [];


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
    /*
    if (list.length === 0) {
        idPlayList = 0;
    } else {
        idPlayList = getID(list[list.length - 1]);
        idPlayList++;
        // [0 , 2 , 3 , 4 ]
    }
    */
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
    // console.log(list.indexOf(idPlayList));
    // list.splice(list.indexOf(playlist),1);
    // list.splice(indexPlaylist,1);
    // list.remove(list.indexOf(playlist));

    /*
    var found = Boolean(false);
    let j = 0 ;
    while (!found ) {
        if (j < list.length) {
             if(idPlaylist === list[j].idPlayList) {
                list.splice(j,1);
                found = true;
             }
        }
        else {
             found = true;
         }
    }
     */
}

//get position of a playlist
var getposition = function(idPlaylist) {
    for(let i = 0; i<list.length; i++){
        if (list[i].idPlayList == idPlaylist)
            return i;
    }
    return -1;
}

// ajouter un Contributeur dans la playlist
var ajouterUserInPlaylist = function (idPlaylist, nomUser) {
    let position = getposition(idPlaylist);
    if( position !== -1){
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

// ajouter un Morceau et un Contributeur dans la Playlist
var ajouterUserMorceauInPl = function (idPlaylist, nomUser, titre) {
    let position = getposition(idPlaylist);
    if (position !== -1) {
        list[position].listMorceau.push(titre);
        list[position].listContributeur.push(nomUser)
        return list[position];
    }
}

exports.ajouterPlayList = ajouterPlayList;
exports.getPlayList = getPlayList;
exports.listerPlayList = listerPlayList;
exports.incrementerNbClic = incrementerNbClic;
exports.searchPlayList = searchPlayList;
exports.getPlayListbyUsername = getPlayListbyUsername;
exports.supprimerPlayList = supprimerPlayList;
exports.ajouterUserInPlaylist = ajouterUserInPlaylist;
exports.ajouterMorcerauInPlayList = ajouterMorcerauInPlayList;
exports.ajouterUserMorceauInPl = ajouterUserMorceauInPl;

