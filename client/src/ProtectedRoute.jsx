import React from "react";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
export default function ProtectedRoute(){
    
    const [isAuth, setIsAuth] = useState(true);
    
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}