import React, { useState } from 'react';

import {useQuery} from 'react-query';

import regions from '../utils/regions.json';
import {getUser} from '../api/user';

import {AiOutlineSearch , AiTwotoneEnvironment} from 'react-icons/ai';
import styles from '../styles/GetUser.module.css';

const allRegions = Object.keys(regions);

export default function GetUser() {
  // State vars
  const [mail, setMail] = useState('');

  // Endpoints
  const { data, isLoading, refetch } = useQuery(['getUser'],
                                               () => {return getUser({mail}); },
                                       { enabled: false }
                                    );


  const handleMail = (e) => setMail(e.target.value);
  const submit = () => refetch();

  return (
        <div className={styles.container}>
            <h1>Busca un usuario de Adara Styling</h1>
            <div className={styles.searchSection}>
                <input type="text" value={mail} onChange={handleMail} placeholder="ejemplo@ejemplo.com" />
                {(!isLoading)? <button className={styles.searchButton} onClick={submit}><AiOutlineSearch styles={styles.searchIcon} /></button> : <div>Cargando ...</div>}
            </div>
            {
                data && (
                    <div className={styles.dataContainer}>
                        <h1>{data.firstName + " " + data.lastName}</h1>
                        <h2>{data.mail}</h2>
                        <div className={styles.row}>
                            <div className={styles.section}>
                                <div className={styles.label}>Género</div>
                                <div className={styles.data}>{data.gender === 'M' ? 'Masculino' : 'Femenino'}</div>
                            </div>
                            <div className={styles.section}>
                                <div className={styles.label}>Calzado</div>
                                <div className={styles.data}>{data.shoeSize}cm</div>
                            </div>
                        </div>
                        <div className={styles.ubicationSection}>
                            <AiTwotoneEnvironment className={styles.ubication} />
                                <div className={styles.data}>
                                    {data.commune + " ," + data.region}
                                </div>
                        </div>
                        <div className={styles.section}>
                        </div>
                        <div className={styles.section}>
                        </div>

                    </div>
                )
            }
        </div>

  )
}
