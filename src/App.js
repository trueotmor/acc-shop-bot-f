import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(()=>{
    tg.ready();
  })

  return (
    <div className="App">
      Работает
    </div>
  );
}

export default App;
