import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import host from "./utils/links";

function App() {


  return (
    <>
      <h1>React + Django backend</h1>
      <div className="card">
        <img src={reactLogo} alt="React Logo" />
        <img src={viteLogo} alt="Vite Logo" />
      </div>
    </>
  )
}

export default App
