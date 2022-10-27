const { dateIsValid } = require('./utils');
const { menShoeSize, womenShoeSize, maleGender, femaleGender } = require('./constants');

// Con esto se simula una base de datos
const {User} = require('./bd');


function createUser(req, res) {
    const {
        mail,
        password,
        firstName,
        lastName,
        gender,
        birthday,
        region,
        commune,
        shoeSize } = req.body;
    // Validamos que todos los campos no sean nulos
    if (!mail && !password && !firstName &&
        !lastName && !gender && !birthday &&
        !region && !commune && !shoeSize) 
    {
        res.status(422);
        return res.send('Error: Parameters cannot be null');
    }
    // Se valida email
    const validMail =  mail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validMail) {
        res.status(422);
        return res.send('Mail: Not valid mail provided');
    }
    if (password.length < 8) {
        res.status(422);
        return res.send('Password: Too short password provided');
    }
    // Se valida fecha de nacimiento
    if (!dateIsValid (new Date(birthday))) {
        res.status(422);
        return res.send('Birthday: Invalid date');
    }
    // Se valida genero y talla de zapato
    if (gender === maleGender) {
        if (!menShoeSize.has(shoeSize)) {
            res.status(422);
            return res.send('ShoeSize: Not valid size');
        }
    } else if (gender === femaleGender) {
        if (!womenShoeSize.has(shoeSize)) {
            res.status(422);
            return res.send('ShoeSize: Not valid size');
        }
    } else {
        res.status(422);
        return res.send('Gender: Not correct gender format provided');
    }
    /*
    Se validan los datos mas importantes de momento, queda por validar region y comuna,
    eso lo haria con un objeto que almacene las regiones y sus respectivas comunas, luego
    se chequea que exista la region como llave y que la comuna entre las comunas asociadas a
    dicha llave
    */

    // Por nuestra actual implementacion, se usa al mail como llave para que sea mas facil
    // obtenerlo en get user
    User[mail] = {password, // En un caso real se guardaria encriptada
                 firstName,
                 lastName,
                 gender,
                 birthday,
                 region,
                 commune,
                 shoeSize
    };
    res.status(200);
    return res.send('Usuario agregado correctamente');
}


function getUser(req, res) {
    const { mail } = req.params;
    if (!mail || !User[mail]) {
        res.status(404);
        res.send('User not found');
        return res.json(null);
    }
    // Se evita mandar la constraseña
    const {password, ...userFound } = User[mail];
    userFound['mail'] = mail;

    return res.json(userFound);
}


module.exports = {
    createUser,
    getUser
};