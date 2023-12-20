import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Interview from './components/pages/Interview';
import ShowAnswer from './components/pages/ShowAnswer';
import CommonQuestion from './components/pages/CommonQuestion';
import AnalyseInterview from './components/pages/AnalyseInterview';
import './App.css'
import ShowAnalysis from './components/pages/ShowAnalysis';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/interview' element={<Interview/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/common-question' element={<CommonQuestion/>}/>
        <Route path='/analyse-interview' element={<AnalyseInterview/>}/>
        <Route path='/answer/:question' element={<ShowAnswer/>}/>
        <Route path='/analyse-interview/:id' element={<ShowAnalysis/>}/>
      </Routes>
    </Router>
  );
}

export default App;