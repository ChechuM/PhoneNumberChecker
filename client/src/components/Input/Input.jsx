import { getCountries, validatePhone } from '../../handlers';
import style from './Input.module.css';
import React, { useState, useEffect } from "react";

function checkErrors ({number, code}) {
    let errors = {};
    if (!number || number.length < 3) errors.number = 'Number must be bigger than 3 digits';
    if (!code) errors.code = 'Please select a country from the list';

    return errors;
}

export default function Input({setResults}) {

    const [countries, setCountries] = useState([]);
    const [toValidate, setToValidate] = useState({
        number: '',
        code: ''
    });
    const [errors, setErrors] = useState({
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
                console.error('Error fetching supported countries', error)
            }
        }
        fetchData();
    }, [])

    const handleSelectChange = (event) => {
        const {value} = event.target;
        setToValidate({
            code: value
        })
        setErrors(
            checkErrors({
                number: toValidate.number,
                code: value
            })
        )
    }

    const handleInputChange = (event) => {
        const {value} = event.target;
        setToValidate({
            ...toValidate,
            number: value
        })
        setErrors(
            checkErrors({
                code: toValidate.code,
                number: value
            })
        )
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (Object.values(errors).length === 0) {
                const validated = await validatePhone(toValidate)
                if(!validated) {
                    throw new Error('Error validating phone number when submitting')
                }
            
                setResults(validated)
                document.getElementById('phoneInput').value = ''
                // document.getElementById('countrySelect').value = ''
                setToValidate({
                    number: '',
                    code: ''
                })
            }
            else {
                setErrors(errors);
                alert('There seems to be some errors. Please check that everything is ok')
            }
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
                <option value="" key="first" id='countrySelect' hidden> Select one of the supported countries</option>
                {
                countries.map((country,i) => (
                    <option value={country.code} key={i}>{country.name}</option>
                ))
                }
                </select>
                {
                    errors.code && <p className={style.warning}>{errors.code}</p>
                }
                <span>  </span>
                <label className={style.labels}> Phone Number </label>
                <input type="number" className={style.phone} onChange={handleInputChange} placeholder='0411 00 00' name='number' id='phoneInput'/> 
                <span>  </span>
                {
                    errors.number && <p className={style.warning}>{errors.number}</p>
                }

                {
                    toValidate.number && !errors.code && !errors.number && <button className={style.button} onClick={handleSubmit}> Verify </button>
                }

            </form>
        </div>
    )
}