import { useEffect } from 'react';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';

function App() {
  const {tg} = useTelegram();

  useEffect(()=>{
    tg.ready();
  },[]);

  return (
    <div className="App">
        <Header/>
        <Route>
          <Route index element={<ProductList />}/>
          <Route path={'/form'} element={<Form />}/>
        </Route>
    </div>
  );
};

export default App;
