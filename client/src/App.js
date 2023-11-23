import style from './App.module.css'
import Input from './components/Input/Input';
import Results from './components/Results/Results';
import React, { useState } from "react";

function App() {
  const [results, setResults] = useState()

  return (
    <div className={style.total}>
      <h1 className={style.title}>Phone Number Checker</h1>
      <div className={style.base}>
        <Input setResults={setResults}/>
        <Results results={results}/>
      </div>
    </div>
  );
}

export default App;
