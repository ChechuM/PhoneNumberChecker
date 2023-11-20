import { getCountries, validatePhone } from '../../handlers';
import style from './Input.module.css';
import React, { useState, useEffect } from "react";

export default function Input({setResults}) {

    const [countries, setCountries] = useState([]);
    const [toValidate, setToValidate] = useState({
        number: '',
        code: ''
    })

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

    const handleSelectChange = (event) => {
        const {value} = event.target;
        setToValidate({
            code: value
        })
    }

    const handleInputChange = (event) => {
        const {value} = event.target;
        setToValidate({
            ...toValidate,
            number: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('el estado toValidate antes de submit', toValidate)
        try {
            const validated = await validatePhone(toValidate)
            if(!validated) {
                throw new Error('Error validating phone number when submitting')
            }
            
            setResults(validated)
        }
        catch(error) {
            console.error('Error validating phone number', error)
        }
    }

    return (
        <div className={style.input}>
            <form onSubmit={handleSubmit}> 
               <label className={style.labels}> Country </label>
                <select name='country' className={style.country} onChange={handleSelectChange}>
                <option value="" key="first" hidden> Select one of the supported countries</option>
                {
                countries.map((country,i) => (
                    <option value={country.code} key={i}>{country.name}</option>
                ))
                }
                </select>
                <span>  </span>
                <label className={style.labels}> Phone Number </label>
                <input type="number" className={style.phone} onChange={handleInputChange} placeholder='0411 00 00' name='number'/> 
                <span>  </span>

                <button className={style.button} onClick={handleSubmit}> Verify </button>
            </form>
        </div>
    )
}