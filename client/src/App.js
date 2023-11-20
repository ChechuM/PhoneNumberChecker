import style from './App.module.css'
import Input from './components/Input/Input';
import Results from './components/Results/Results';
import React, { useState } from "react";

function App() {
  const [results, setResults] = useState()

  return (
    <div className={style.app}>
      <Input setResults={setResults}/>
      <Results results={results}/>
    </div>
  );
}

export default App;
