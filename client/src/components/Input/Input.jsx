import { getCountries } from '../../handlers';
import style from './Input.module.css';
import React, { useState, useEffect } from "react";

export default function Input({setResults}) {
    // const hardCountries = [
    //     {
    //         "name": "Argentina",
    //         "code": "AR"
    //     },
    //     {
    //         "name": "Australia",
    //         "code": "AU"
    //     },
    //     {
    //         "name": "Venezuela",
    //         "code": "VE"
    //     }
    // ]

    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const supported = await getCountries();
                if (!supported) {
                    throw new Error('Error getting supported countries at the useEffect');
                }

                setCountries(supported)
            }
            catch (error){
                console.error('Error fetching data', error)
            }
        }
        fetchData();
    }, [])

    const handleSubmit = () => {
        // usa el handler importado para pedir los resultados y luego usa el setResults para cambiar el estado en App.js
        
    }

    return (
        <div className={style.input}>
            <form> 
               <label className={style.labels}> Country </label>
                <select name='country' className={style.country} onChange={(e)=> console.log('touched target', e.target, 'y value:', e.value)}>
                <option value="" key="first" hidden> Select one of the supported countries</option>
                {
                countries.map((country,i) => (
                    <option value={country.code} key={i}>{country.name}</option>
                ))
                }
                </select>
                <span>  </span>
                <label className={style.labels}> Phone Number </label>
                <input type="number" className={style.phone}/> 
                <span>  </span>

                <button className={style.button}> Verify </button>
            </form>
            

        </div>
    )
}