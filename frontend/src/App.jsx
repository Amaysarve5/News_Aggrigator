import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Country from './components/Country'
import News from './components/News'
import TopHeadlines from './components/TopHeadline'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='w-full'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<News/>}></Route>
          <Route path='/top-headlines/:category' element={<TopHeadlines/>}></Route>
          <Route path='/country/:iso' element={<Country/>}></Route>
        </Routes>
      </BrowserRouter>
    
      </div>
    </>
  )
}

export default App
