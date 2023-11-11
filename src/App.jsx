import { useCallback, useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed]=useState(false);
  let [characterAllowed, setCharacterAllowed]=useState(false);
  let [password, setPassword]=useState("");
  let [btnText, setBtnText]=useState("Copy");
  let passwordRef=useRef(null);

  let passwordGenerator=useCallback(() => {
    let pass="";
    let str="ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz";

    setBtnText("Copy");

    if(numberAllowed){
      str+="0123456789";
    }

    if(characterAllowed){
      str+="@#$&_{}[]()+-/";
    }

    for (let i = 0; i < length; i++) {
      let char=Math.floor(Math.random() * str.length + 1);
      pass+=str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, characterAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  let copyPasswordToClipboard=() => {
    passwordRef.current?.select();   //we are using '?' because the value of the input field may be null for some unexpected reasons
    window.navigator.clipboard.writeText(password);
    setBtnText("Copied!");
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800 pb-4 pt-1'>
        <h1 className='text-center text-white text-lg my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' ref={passwordRef} readOnly/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>{btnText}</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={16} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {setNumberAllowed((prev) => !prev)}}/>
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={characterAllowed} id='characterInput' onChange={() => {setCharacterAllowed((prev) => !prev)}}/>
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
