import React from "react";
import './App.css';
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

    changeSignUp = () => {
        this.setState({
            add: !this.state.add,
            showButtons: !this.state.showButtons,
        })
    }

    changeLogin = () => {
        this.setState({
            login: !this.state.login,
            showButtons: !this.state.showButtons,
        })
    }

    changeGuest = () => {
        this.setState({
            guest: !this.state.guest,
            showButtons: !this.state.showButtons,
        })
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    {this.state.showButtons ?
                        <div className="DSignUp">
                            <div className="Main-title">
                                <label> {this.state.title} </label>
                                <div className={"nav-button"}>
                                    <button className={"btn"}
                                            onClick={() => this.setState({
                                                login: true,
                                                showButtons: false,
                                                title: false
                                            })}>
                                        <NavLink style={{width: "100px", margin: "72px"}} to={"/login"}>Login</NavLink>
                                    </button>
                                </div>
                                <div>
                                    <button className={"btn"}
                                            onClick={() => this.setState({
                                                add: true,
                                                showButtons: false,
                                                title: false
                                            })}>
                                        <NavLink style={{width: "100px", margin: "66px"}} to={"/signup"}>Sign
                                            up</NavLink>
                                    </button>
                                </div>
                                <div>
                                    <button className={"btn"}
                                            onClick={() => this.setState({
                                                guest: true,
                                                showButtons: false,
                                                title: false
                                            })}>
                                        <NavLink style={{width: "100px", margin: "30px"}} to={"/guest"}>Continue as a
                                            guest</NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                        </div>
                    }
                    <Routes>
                        <Route path={"/login"} element={<LoginPage
                            changeLogin={this.changeLogin}/>}/>
                        <Route path={"/signup"} element={<SignUpPage
                            changeSignUp={this.changeSignUp}/>}/>
                        <Route path={"/guest"} element={<GuestPage
                            changeGuest={this.changeGuest}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;


