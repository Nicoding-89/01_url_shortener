import './App.css'
import { Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/error' element={<ErrorPage />}></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </>
  )
}

export default App
