import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Detail from "./Routes/Detail";
import "./index.css";
import App from "./App"
import {AuthenticationProvider, useAuthentication } from "./hooks/useAuthentication"
import {ThemeProvider,useThemeContext} from "./hooks/useTheme"

import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom"

const appRouter = createBrowserRouter([
  {path:'',element:<App/>,children:[
    {path:'',element:<Navigate to='home'/>},
    {path:'login',element:<Login/>},
    {path:'home',element:<Home/>},
    {path:'dentist/:id',element:<Detail/>},
  ]}
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <ThemeProvider>
        {<RouterProvider router={appRouter}/> }
      </ThemeProvider>
    </AuthenticationProvider> 
  </React.StrictMode>
);
