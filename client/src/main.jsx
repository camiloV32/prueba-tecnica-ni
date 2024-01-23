import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// import App from './App.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Login from './components/login/login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/",
    element:<ProtectedRoute/>,
    children: [
      {
        path:"/dashboard",
        element:<Dashboard/>
      }
    ]
  },
  {
    path:"*",
    element:<Navigate to="/"/>
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)