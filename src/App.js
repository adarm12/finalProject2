import React from "react";
import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Routes,NavLink, Link} from "react-router-dom";
import LoginPage from "./Login pages/LoginPage";
import SignUpPage from "./Login pages/SignUpPage";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="Title">
                    <label> Menu </label>
                </div>
                <BrowserRouter>
                    <div className="NavLink">
                        <div>
                            <button>
                                <NavLink style={{margin: "30px"}} to={"/login"}>Login</NavLink>
                            </button>
                        </div>
                        <div>
                            <button>
                                <NavLink style={{margin: "30px"}} to={"/add-user"}>Sign Up</NavLink>
                            </button>
                        </div>
                    </div>
                    <Routes>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/add-user"} element={<SignUpPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;


