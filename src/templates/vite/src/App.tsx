import { useState } from 'react';
import derivLogo from '/deriv-logo.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <a href='https://deriv.com' target='_blank'>
                    <img src={derivLogo} className='logo' alt='Deriv logo' />
                </a>
            </div>
            <h1>Deriv V2</h1>
            <div className='card'>
                <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
        </>
    );
}

export default App;
