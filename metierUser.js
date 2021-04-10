// partie Metier du PlayList (back)

// list of playlist

var listU = [];

function User (nomUser,idUser){
    this.nomUser = nomUser;
    this.idUser = idUser;
}


//ajouter an User
var ajouterUser = function (user) {
    const idUser = listU.length;
    listU[idUser] = new User(user.nomUser,idUser);
    return listU[idUser];
}

// Get an User by name
var getUser = function (nomUser) {
    if (typeof listU[nomUser] === 'undefined') return {};
    else {
        return listU[nomUser];
    }
}

//lister Users
var listerUser = function () {
    return Object.values(listU);
}


var getUserbyName = function (nomUser) {
    if (typeof listU[nomUser] === 'undefined') return {};
    else {
        return listU[nomUser];
    }
}


exports.ajouterUser = ajouterUser;
exports.getUser = getUser;
exports.listerUser = listerUser;
exports.getUserbyName = getUserbyName;
