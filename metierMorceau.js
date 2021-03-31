// partie Metier du PlayList (back)
var listM = [];
// list of playlist


function Morceau(titre, artiste){
    this.titre = titre;
    this.artist = artiste;

}

function Morceau (morceau){
    this.titre = morceau.titre;
    this.artist = morceau.artist;
}

//ajouter un Morceau de music dans la liste Morceau
var ajouterMorceau = function(morceau)  {
    const idMorceau = this.listM.length;
    this.listM[idMorceau] = new Morceau(morceau);
    return listM[idMorceau];

}

exports.ajouterMorceau = ajouterMorceau;

