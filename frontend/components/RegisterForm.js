import React, { useState } from 'react';

import {isError, useMutation} from 'react-query';
import DatePicker from "react-datepicker";

import regions from '../utils/regions.json';
import {menShoeSize, womenShoeSize} from '../utils/shoeSize';
import {dateIsValid, dateToStr} from '../utils/utils';
import {addUser} from '../api/user';
import styles from '../styles/FormContainer.module.css';

const allRegions = Object.keys(regions);

export default function RegisterForm() {
  // State vars
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('M');
  const [birthday, setBirthday] = useState('');
  const [region, setRegion] = useState(allRegions[0]);
  const [commune, setCommune] = useState(allRegions[0][0]);
  const [shoeSize, setShowSize] = useState('');

  const [error, setError] = useState('');

  // Endpoints
  const {
    mutate,
    isSuccess,
    isLoading,
  } = useMutation(addUser,() => {});

  // changeTextHandler
  
  const handleChangeState = (setState) => (e) => setState(e.target.value);

  const handleRegion = (e) => {
    setRegion(e.target.value);
    // Change default commune
    setCommune(regions[e.target.value][0]);
  };

  const handleMail = handleChangeState(setMail);
  const handlePassword = handleChangeState(setPassword);
  const handleFirstName = handleChangeState(setFirstName);
  const handleLastName = handleChangeState(setLastName);
  const handleGender = handleChangeState(setGender);
  const handleCommune = handleChangeState(setCommune);
  const handleShoeSize = handleChangeState(setShowSize);

  const submit = async () => {
    // Se valida en el cliente que los campos sean validos
    if (!mail && !password && !firstName &&
        !lastName && !gender && !birthday &&
        !region && !commune && !shoeSize) 
    {
        setError('Debes llenar todos los campos');
        return;
    }
    // Se valida email
    const validMail =  mail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (!validMail) {
        setError('Ingresa un formato valido de mail');
        return;
    }
    if (password.length < 8) {
        setError('La contraseña debe tener un largo mayor o igual a 8 caracteres');
        return;
    }
    if (!dateIsValid(birthday)) {
      setError('Fecha de nacimiento no valida');
      return;
    }
    /*
     Por la forma del formulario, fecha de nacimiento, region, comuna, genero y talla
     de calzado siempre seran validos, pues su valor por defecto lo es y al estar en
     un selector, solo se pueden tomar valoers válidos
    */
   setError(''); // Se borra cualquier error al momento de mandar la request
    try {
      mutate({
              mail,
              password,
              firstName,
              lastName,
              birthday: dateToStr(birthday),
              gender,
              region,
              commune,
              shoeSize
      });
    } catch (_) { 
      setError('Un error ha ocurrido, no se pudo agregar al usuario')
    }
  };

  return (
        <div className={styles.formContainer}>
            <h1>¡Inscríbite en Adara Styling!</h1>
            <label>Mail</label>
            <input type="text" value={mail} onChange={handleMail} placeholder="ejemplo@ejemplo.com" />

            <label>Contraseña</label>
            <input type="password" value={password} onChange={handlePassword} placeholder="12345678" />


            <label>Nombre</label>
            <input type="text" value={firstName} onChange={handleFirstName} placeholder="Nombre" />

            <label>Apellido</label>
            <input type="text" value={lastName} onChange={handleLastName} placeholder="Apellido" />

            <label>Género</label>
            <select value={gender} onChange={handleGender}>
                <option key={"g1"} value="M">Masculino</option>
                <option key={"g2"} value="F">Femenino</option>
            </select>

            <label>Fecha de nacimiento</label>
            <DatePicker selected={birthday} onChange=
              {(date) => setBirthday(date)} />
            <input type="text" value={mail} onChange={setMail} placeholder="ejemplo@ejemplo.com" />
            <label>Region</label>
            <select value={region} onChange={handleRegion}>
                {
                    Object.keys(regions).map((reg, id) => {
                        return <option key={"r" + id} value={reg}>{reg}</option>
                    })
                }

            </select>
            <label>Comuna</label>
           <select value={commune} onChange={handleCommune}>
                {
                    regions[region].map((com, id) => {
                        return <option key={"c"+ id} value={com}>{com}</option>
                    })
                }

           </select>

            <label>Talla de calzado</label>
            <select value={shoeSize} onChange={handleShoeSize}>
                {
                    gender === 'M' ? Object.keys(menShoeSize).map((size, id) => {
                        return <option key={"s" + id} value={menShoeSize[size]}>{size} </option>
                    }) : Object.keys(womenShoeSize).map((size, id) => {
                        return <option key={"s" + id} value={womenShoeSize[size]}>{size}</option>
                    })
                }
            </select>
            <input type="text" value={mail} onChange={setMail} placeholder="ejemplo@ejemplo.com" />
            {!!error && <div>{error}</div>}
            {(!isLoading)? <button onClick={submit}>Unirse</button> : <div>Cargando ...</div>}
            {isSuccess && <div>Usuario agregado correctamente</div>}
            </div>

  )
}
