const url = 'http://localhost:8000/user'


export const addUser = async ({mail, 
                        password,
                        firstName,
                        lastName,
                        gender,
                        birthday,
                        region,
                        commune,
                        shoeSize}) => {
    const res = await  fetch(url, {
          method: 'POST',
          body: JSON.stringify({
          mail,
          password,
          firstName,
          lastName,
          gender,
          birthday,
          region,
          commune,
          shoeSize
        }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      return res;
};

export const getUser = async ({mail}) => {
    const res = await fetch(url + '/' + mail, {
        method: 'GET'
    });
    const parsedResponse = await res.json();
    return parsedResponse;
}


