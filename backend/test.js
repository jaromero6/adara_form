const axios = require('axios');

const users = [
    {
        mail: "ejemplo1@uc.cl",
        password: "123456789",
        firstName: "Ejemplo",
        lastName: "Uno",
        gender: "M",
        birthday: "10-01-1999",
        region: "Metropolitana",
        comuna: "Puente Alto",
        shoeSize: 27.9
    },
    {
        mail: "ejemplo2@uc.cl",
        password: "123456789",
        firstName: "Ejemplo",
        lastName: "Dos",
        gender: "F",
        birthday: "10-01-1999",
        region: "Metropolitana",
        comuna: "Las Condes",
        shoeSize: 27.9
    },
    {
        mail: "ejemplo3",
        password: "123456789",
        firstName: "Ejemplo",
        lastName: "Tres",
        gender: "M",
        birthday: "10-01-1999",
        region: "Metropolitana",
        comuna: "Las Condes",
        shoeSize: 27.9
    },
    {
        mail: "ejemplo4@uc.cl",
        password: "123456789",
        firstName: "Ejemplo",
        lastName: "Cuatro",
        gender: "F",
        birthday: "10-01-1999",
        region: "Metropolitana",
        comuna: "Pirque",
        shoeSize: 22.9
    },
    {
        mail: "ejemplo5@uc.cl",
        password: "123456789"
    },
];

const correctMails = new Set(['ejemplo1@uc.cl', 'ejemplo4@uc.cl'])

async function runTest() {
    createdUsers = [];
    users.forEach(user => {
        createdUsers.push(
            axios({
                method: 'post',
                url: 'http://localhost:8000/user',
                data: user,
                }).then(response => {
                    if (response.status === 200 && correctMails.has(user.mail)) {
                        console.log('Ok')
                    } else {
                        console.log(user.mail + " Creation incorrect");
                    }
                }).catch (error => {
                    if (!correctMails.has(user.mail)) {
                        console.log('Ok')
                    } else {
                        console.log(user.mail + " Creation incorrect");
                    }
                }));
    });
    await Promise.all(createdUsers);
    getUsers = [];
    users.forEach(user => {
        getUsers.push(
            axios({
                method: 'get',
                url: 'http://localhost:8000/user/' + user.mail,
                }).then(response => {
                    if (response.status === 200 && correctMails.has(user.mail)) {
                        console.log('Ok')
                    } else {
                        console.log(user.mail + " Get incorrect");
                    }
                }).catch (error => {
                    if (!correctMails.has(user.mail)) {
                        console.log('Ok')
                    } else {
                        console.log(user.mail + " Get incorrect");
                    }
                }));
    });
    await Promise.all(getUsers);
}
/*
Output expected: Only Ok console logs
*/
runTest();