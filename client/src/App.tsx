import React from 'react'
import StickyNavbar from './components/Layout/Nav'

import AdminDashboard from './components/AdminDashboard'
import Assesment from './components/Assesment/AssesmentPage' 
import Attainment from './components/Attainment/AttainmentPage'
import Curriculum from './components/CurriculumDesgin/CurriculumPage'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Dashboard } from '@mui/icons-material'
import { Outlet } from 'react-router-dom'
import Nav from './components/Layout/Nav'


function App() {
  // let Component;
  // switch (window.location.pathname) {
  //   case "/":
  //     Component = <Dashboard/>
  //     break;
  //   case "/attainment":
  //     Component = <Attainment/>
  //     break;
  //   case "/curriculum":
  //     Component = <Curriculum/>
  //     break;
  //   case "/assesment":
  //     Component = <Assesment/>
  //     break;
  //   default:
  //     break;
  // }

  return (
    <>
      <>
        <Nav />
        <Outlet />
      </>
    </>
  );
}

export default App;
