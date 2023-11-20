import style from './Results.module.css'

export default function Results ({results}) {

    const isValid = results ? (results.isValid ? 'True' : 'False') : 'Wating ...';
    const isPossible = results ? (results.isPossible ? 'True' : 'False') : 'Waiting ...';

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
                    <button className={style.button}>Download CSV</button>
                </>
                )}
            </div>
        </div>
    )
}