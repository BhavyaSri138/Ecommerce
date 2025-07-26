import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter,Routes,Route } from "react-router-dom";
// import './App.css'
import Login from './Login';
import Register from './Register';
import Products from './Products';
import Counter  from './Counter';
import TodoApp from './TodoApp';
import Items from './Items';
import ProductsSpecific from './productsSpecific';

function App() {

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/products' element = {<Products/>}></Route>
      <Route path='/register' element={<Register/>} />
      <Route path='/Counter' element={<Counter/>}></Route>
      <Route path="/products/:id" element={<ProductsSpecific />} />

      <Route path='/todoApp' element={<TodoApp/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App
