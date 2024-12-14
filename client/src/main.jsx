
import { createRoot } from 'react-dom/client'
import { Route, Router, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Home from './pages/Home.jsx'
import Jobs from './pages/Jobs.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Register from './pages/Register.jsx'
import PostApplication from './pages/PostApplication.jsx'
import Login from './pages/Login.jsx'
import {Provider} from "react-redux"
import store from './store/store.js'

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route path='/' element = {<Layout/>}>                       
      <Route path='' element ={<Home/>}/>
      <Route path='/jobs' element={<Jobs/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
      <Route path='/Register' element = {<Register/>}/>
      <Route
            path="/post/application/:jobid"
            element={<PostApplication />}
      />
      <Route path='login' element={<Login/>}/>
    </Route>
    
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
     <RouterProvider router={router} />
  </Provider>,
)
