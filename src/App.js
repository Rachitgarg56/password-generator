
import { useState } from 'react';
import './App.css';
import copyIcon from './assets/copy-icon-25.png';

function App() {

  const [passwordLength, setPasswordLength] = useState(); 
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true); 
  const [checked3, setChecked3] = useState(true);
  const [checked4, setChecked4] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleClick = () => {
    
    if (passwordLength >= 8 && passwordLength <= 50) {
      
      if (checked1 || checked2 || checked3 || checked4) {
        const password = generatePassword(checked1,checked2,checked3,checked4);
        setGeneratedPassword(password);
      } else {
        alert("--All checkboxes are empty--");
      }

    } else {
      alert('Password length not in given range :(');
    }

  }

  const generatePassword = (upperCase,lowerCase,numbers,symbols) => {

    let arr = [];
   
    let eleNo = 0;
    
    while (eleNo < passwordLength) {

      if(upperCase) {
        const randomNumber = Math.floor(Math.random() * 26);
        const randomUppercaseLetter = String.fromCharCode(65 + randomNumber);
        arr.push(randomUppercaseLetter);
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(lowerCase) {
        const randomNumber = Math.floor(Math.random() * 26);
        const randomLowercaseLetter = String.fromCharCode(65 + randomNumber).toLowerCase();
        arr.push(randomLowercaseLetter)
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(numbers) {
        const random = Math.random();
        const randomDigit = Math.floor(random*10);
        arr.push(randomDigit);
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(symbols) {
        const symbols = ['!', '@', '#', '$', '%','&','?'];
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const randomSymbol = symbols[randomIndex];
        arr.push(randomSymbol);
        eleNo++;
      }

    }

    return arr.join('');

  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Password copied :)');
  }


  return (

    <section className='w-full min-h-screen py-8 px-4'>

      <h1 className='text-center text-3xl font-bold mb-8'>Password Generator</h1>

      <div className='container flex flex-col max-w-full gap-12'>

        <form className='flex gap-2 w-full'>
          <input type='text' name='password' id='password' value={generatedPassword} className='border border-solid border-gray-400 bg-gray-50 w-full'></input>
          <button type='button' className='w-10 h-10'>
            <img alt='' src={copyIcon} className='w-full' onClick={handleCopy}/>
          </button>
        </form>

        <div className='flex flex-col self-start gap-4 sm:flex-row'>
          <label>Select Password Length<strong>(**8-50 characters**)</strong></label>
          <input type='number' name='length-of-password' id='length-of-password' value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} className='border border-solid border-black'></input>
        </div>

        <div className='boxes flex flex-col gap-2'>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' checked={checked1} onChange={(e) => setChecked1(e.target.checked)} />
              <label>Include upper case</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' checked={checked2} onChange={(e) => setChecked2(e.target.checked)} />
              <label>Include lower case</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' checked={checked3} onChange={(e) => setChecked3(e.target.checked)} />
              <label>Include numbers</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' checked={checked4} onChange={(e) => setChecked4(e.target.checked)} />
              <label>Include symbols</label>
          </div>
        </div>

        <button type='submit' className=' rounded-md py-2 px-4 bg-blue-500 hover:bg-green-500 text-white' onClick={handleClick}>Generate Password</button>

      </div>
      
    </section>

  );
}

export default App;
