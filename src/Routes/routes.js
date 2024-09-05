import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { PrivateRoutes } from ".";
import SignUp from "../pages/SingUp";

function RoutesApp(){
    return(
        <BrowserRouter>
            
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/home' element={<PrivateRoutes/>}>
                    <Route path="/home" element={<Home/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;