import React from 'react';
import {  Outlet, Route, RouterProvider, useRoutes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import AdminRoute from './pages/Admin/AdminRoute';
import Home from './pages/auth/Home';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App = () => {
  
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
  
        path:'/login',
        element:<LoginForm/>
    
    },
    {
      path:'/admin',
      element:<AdminRoute/>,
      children:[
       
        {
          path:'dashboard',
          element:<AdminDashboard/>
        }
      ]
    }
    
    
    
  ]);

  return (
   <div>
    {routes}
   </div>
  );
};

// const Home = () => {
//   return (
//     <div>
//       <h1>Home Screen</h1>
//     </div>
//   );
// };

export default App;
