import style from './Results.module.css'
import {downloadCSVfile} from '../../handlers'

export default function Results ({results}) {

    const isValid = results ? (results.isValid ? 'True' : 'False') : undefined;
    const isPossible = results ? (results.isPossible ? 'True' : 'False') : undefined;

    const handleDownload = () => {
        let obj = {
            isValid,
            isPossible,
            type: results.type,
            intFormat: results.intFormat
        }

        downloadCSVfile(obj)
    }

    return (
        <div className={style.allresults}>
            <div>
                {results && (
                <>
                    <h2>Results</h2>
                    <div><b>Is Valid:</b> {isValid}</div>
                    <div><b>Is Possible:</b> {isPossible}</div>
                    <div><b>Phone Type:</b> {results.type}</div>
                    <div><b>International Format:</b> {results.intFormat}</div>
                    {
                        results.isValid && (
                            <button className={style.button} onClick={()=>handleDownload()}>Download CSV</button>
                        )
                    }
                </>
                )}
            </div>
        </div>
    )
}