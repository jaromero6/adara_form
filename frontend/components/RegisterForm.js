import React, { useState } from 'react';

import { useMutation } from 'react-query';
import DatePicker from "react-datepicker";
import'react-datepicker/dist/react-datepicker.css'

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
  const [birthday, setBirthday] = useState(new Date());
  const [region, setRegion] = useState(allRegions[0]);
  const [commune, setCommune] = useState(regions[allRegions[0]][0]);
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

  const handleGender = (e) => {
      if (e.target.value === 'M') {
        setShowSize(Object.values(menShoeSize)[0]);
    } else {
        setShowSize(Object.values(womenShoeSize)[0]);
    }
    setGender(e.target.value);
  }

  const handleMail = handleChangeState(setMail);
  const handlePassword = handleChangeState(setPassword);
  const handleFirstName = handleChangeState(setFirstName);
  const handleLastName = handleChangeState(setLastName);
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

            <div className={styles.row}>
              <div className={styles.dataSection}>
                <div className={styles.label}>Mail</div>
                <input type="text" className={styles.inputStyle} value={mail} onChange={handleMail} placeholder="ejemplo@ejemplo.com" />
              </div>
              <div className={styles.dataSection}>
                <div className={styles.label}>Contraseña</div>
                <input type="password" className={styles.inputStyle} value={password} onChange={handlePassword} placeholder="12345678" />
              </div>
            </div>


            <div className={styles.row}>
              <div className={styles.dataSection}>
                <div className={styles.label}>Nombre</div>
                <input type="text" className={styles.inputStyle} value={firstName} onChange={handleFirstName} placeholder="Nombre" />
              </div>

              <div className={styles.dataSection}>
                <div className={styles.label}>Apellido</div>
                <input type="text" className={styles.inputStyle} value={lastName} onChange={handleLastName} placeholder="Apellido" />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.dataSection}>
                <div className={styles.label}>Género</div>
                <select className={styles.inputStyle} value={gender} onChange={handleGender}>
                    <option key={"g1"} value="M">Masculino</option>
                    <option key={"g2"} value="F">Femenino</option>
                </select>
              </div>

              <div className={styles.dataSection}>
                <div className={styles.label}>Talla de calzado</div>
                <select className={styles.inputStyle} value={shoeSize} onChange={handleShoeSize}>
                    {
                        gender === 'M' ? Object.keys(menShoeSize).map((size, id) => {
                            return <option key={"s" + id} value={menShoeSize[size]}>{size} </option>
                        }) : Object.keys(womenShoeSize).map((size, id) => {
                            return <option key={"s" + id} value={womenShoeSize[size]}>{size}</option>
                        })
                    }
                </select>
              </div>
            </div>

            <div className={styles.label}>Fecha de nacimiento</div>
            <DatePicker className={styles.inputStyle} selected={birthday} onChange=
              {(date) => setBirthday(date)} />

            <div className={styles.row}>
              <div className={styles.dataSection}>
                <div className={styles.label}>Region</div>
                <select className={styles.inputStyle} value={region} onChange={handleRegion}>
                    {
                        Object.keys(regions).map((reg, id) => {
                            return <option key={"r" + id} value={reg}>{reg}</option>
                        })
                    }

                </select>
              </div>
              <div className={styles.dataSection}>
                <div className={styles.label}>Comuna</div>
                  <select className={styles.inputStyle} value={commune} onChange={handleCommune}>
                    {
                        regions[region].map((com, id) => {
                            return <option key={"c"+ id} value={com}>{com}</option>
                        })
                    }

                  </select>
                </div>
            </div>

            <div className={styles.endSection}>
              {!!error && <div>{error}</div>}
              {(!isLoading)? <button className={styles.submitButton} onClick={submit}>Unirse</button> : <div>Cargando ...</div>}
              {isSuccess && <div>Usuario agregado correctamente</div>}

            </div>
          </div>

  )
}
