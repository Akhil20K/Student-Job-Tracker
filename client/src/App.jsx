import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppList from './components/List/appList'
import AppForm from './components/Form/appForm'
import Home from './components/Home/home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/add' element={ <AppForm /> }/>
        <Route path='/list' element={ <AppList /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
