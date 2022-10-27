import React, { useState } from 'react';

import {useQuery} from 'react-query';

import regions from '../utils/regions.json';
import {menShoeSize, womenShoeSize} from '../utils/shoeSize';
import {dateIsValid, dateToStr} from '../utils/utils';
import {getUser} from '../api/user';
import styles from '../styles/FormContainer.module.css';

const allRegions = Object.keys(regions);

export default function GetUser() {
  // State vars
  const [mail, setMail] = useState('');
  const [trigger, setTrigger] = useState(false);

  const [error, setError] = useState('');

  // Endpoints
  const { data, isLoading, refetch } = useQuery(['getUser'],
                                               () => {return getUser({mail}); },
                                       { enabled: false }
                                    );


  const handleMail = (e) => setMail(e.target.value);
  const submit = () => refetch();

  return (
        <div className={styles.formContainer}>
            <h1>¡Inscríbite en Adara Styling!</h1>
            <label>Mail</label>
            <input type="text" value={mail} onChange={handleMail} placeholder="ejemplo@ejemplo.com" />
            {(!isLoading)? <button onClick={submit}>Buscar</button> : <div>Cargando ...</div>}
            </div>

  )
}
