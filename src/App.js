import React from "react";
import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Routes, NavLink, Link} from "react-router-dom";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import GuestPage from "./GuestPage";


class App extends React.Component {
    state = {
        title: "Menu",
        showButtons: true,
        login: false,
        add: false,
        guest: false,
    }

    render() {
        return (
            <div className="App">
                <div className="Title">
                    <label> {this.state.title} </label>
                </div>
                <BrowserRouter>
                    {this.state.showButtons ?
                        <div className="NavLink">
                                <div>
                                    <button onClick={() => this.setState({login: true,showButtons: false,title:"Login" })}>
                                        <NavLink style={{margin: "30px"}} to={"/login"}>Login</NavLink>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => this.setState({add: true,showButtons: false, title:"Sign up"})}>
                                        <NavLink style={{margin: "30px"}} to={"/add-user"}>Sign up</NavLink>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => this.setState({guest: true, showButtons: false, title:"guest"})}>
                                        <NavLink style={{margin: "30px"}} to={"/guest"}>Continue as a guest</NavLink>
                                    </button>
                                </div>
                        </div>
                        :
                        <div>
                        </div>
                    }
                    <Routes>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/add-user"} element={<SignUpPage/>}/>
                        <Route path={"/guest"} element={<GuestPage/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;


