// partie Metier du PlayList (back)

// list of playlist

var listU = [];

function User (nomUser){
    this.nomUser = nomUser;
}

function User (user){
    this.nomUser = user.nomUser;
}

//ajouter un Morceau de music dans la liste Morceau
var ajouterUser = function(user)  {
    const idUser = this.listU.length;
    this.listU[idUser] = new User(user);
    return listU[idUser];

}

exports.ajouterUser = ajouterUser;
