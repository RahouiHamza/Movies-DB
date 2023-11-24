import React from 'react'
import AllMovies from './AllMovies'
import Page404 from "./Components/Page404"
import { Route, Routes } from 'react-router-dom'
import ShowDetails from './Components/ShowDetails'

export default function App() {
  return (
    <div>
      <Routes >
        <Route path='/' element={<AllMovies/>}/>
        <Route path='/movies/:id' element={<ShowDetails/>}/>
        <Route path="*" element={<Page404/>}/>
      </Routes>
    </div>
  )
}
