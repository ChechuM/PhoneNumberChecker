import style from './Results.module.css'

export default function Results () {
    return (
        <div>
            <h2>Results</h2>
            <div><b>Is Valid:</b></div>
            <div><b>Is Possible:</b></div>
            <div><b>Phone Type:</b></div>
            <div><b>International Format:</b></div>

            <button className={style.button}>Download CSV</button>
        </div>
    )
}