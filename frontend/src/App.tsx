import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import host from "./utils/links";

function App() {
  const [count, setCount] = useState(0)

  const incrementCount = async () => {
    console.log('incrementing count')
    try {
      const response = await fetch(`${host}/sampleapp/increment-count/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setCount(data.count);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  }

  const resetCount = async () => {
    console.log('resetting count')
    try {
      const response = await fetch(`${host}/sampleapp/reset-count/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setCount(data.count);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  }
  const getCount = async () => {
    console.log('getting count')
    try {
      const response = await fetch(`${host}/sampleapp/get-count/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setCount(data.count);
      } else {
        // Handle error response
      }
    } catch (error) {
      // Handle network error
    }
  }

  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <h1>React + Django backend</h1>
      <div className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <button onClick={resetCount}>
          reset count
        </button>
      </div>
    </>
  )
}

export default App
