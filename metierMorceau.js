// partie Metier du PlayList (back)
const listM = [];
// list of playlist


function Morceau(titre, artiste, idMorceau){
    this.titre = titre;
    this.artiste = artiste;
    this.idMorceau = idMorceau;

}

/*
function Morceau (morceau){
    this.titre = morceau.titre;
    this.artist = morceau.artist;
}
*/

//ajouter un Morceau de music dans la liste Morceau
var ajouterMorceau = function(morceau)  {
    const idMorceau = listM.length;
    listM[idMorceau] = new Morceau(morceau.titre, morceau.artiste, idMorceau);
    return listM[idMorceau];

}

//get a Morceau
/*
var getMorceau = function (idMorceau) {
    if (typeof listM[idMorceau] === 'undefined') return {};
    else {
        return listM[idMorceau];
    }
}
*/


//lister les Morceaux
var listerMorceau = function () {
    return Object.values(listM);
 }

//find by nomMorceau and artiste
var searchMorceau = function (titre, artiste) {
    //copy list to prevent modifications on list
    var resMorceau = [...listM];
    if (titre){
        if(artiste){
            resMorceau = resMorceau.filter(morceau => {
                if(morceau.titre.indexOf(titre) !== -1 && morceau.artiste.indexOf(artiste) !== -1) {
                    return true
                }

            })
        }
    }
    if (titre) {
        resMorceau = resMorceau.filter(morceau => {
            if(morceau.titre.indexOf(titre) !== -1) {
                return true
            }
        })
    }
    if (artiste) {
        resMorceau = resMorceau.filter(morceau => {
            if(morceau.artiste.indexOf(artiste) !== -1) {
                return true
            }
        })
    }
    return resMorceau;
}


exports.ajouterMorceau = ajouterMorceau;
exports.listerMorceau = listerMorceau;
//exports.getMorceau = getMorceau;
exports.searchMorceau = searchMorceau;
