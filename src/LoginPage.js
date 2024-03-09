import axios, {formToJSON} from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import {BrowserRouter, Route, Routes, NavLink, Link} from "react-router-dom";
import LeagueTable from "./LeagueTable";
import GamblingPage from "./GamblingPage";
import LiveDashboard from "./LiveDashboard";
import EditProfilePage from "./EditProfilePage";

class LoginPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        success: false,
        connectionMessage: "",
    }

    componentDidMount() {
    }

    login = () => {
        sendApiPostRequest("http://localhost:9124/login", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }, (response) => {
            if (response.data.success) {
                console.log("התחברת בהצלחה");
                this.setState({success: true});
                const cookies = new Cookies(null, {path: '/'});
                cookies.set('id', response.data.id);
                cookies.set('secret', response.data.secret);
            } else {
                if (response.data.errorCode === 11)
                    this.setState({connectionMessage: "סיסמה לא נכונה"});
                if (response.data.errorCode === 4)
                    this.setState({connectionMessage: "אין סיסמה"});
                if (response.data.errorCode === 2)
                    this.setState({connectionMessage: "שם משתמש לא קיים"});
                if (response.data.errorCode === 3)
                    this.setState({connectionMessage: "אין שם משתמש"});
                if (response.data.errorCode === 12)
                    this.setState({connectionMessage: "מייל לא קיים"});
                if (response.data.errorCode === 7)
                    this.setState({connectionMessage: "אין מייל"});
            }
        })
    }


    // errorMessage = (errorCode, messageToEdit) => {
    //     switch (errorCode) {
    //         case 11:
    //             this.setState({ [messageToEdit]: "סיסמה לא נכונה" });
    //             break;
    //         case 3:
    //             this.setState({ [messageToEdit]: "אין שם משתמש" });
    //             break;
    //         case 4:
    //             this.setState({ [messageToEdit]: "אין סיסמה" });
    //             break;
    //         case 12:
    //             this.setState({ [messageToEdit]: "מייל לא קיים" });
    //             break;
    //         case 2:
    //             this.setState({ [messageToEdit]: "שם משתמש לא קיים" });
    //             break;
    //         case 7:
    //             this.setState({ [messageToEdit]: "אין מייל" });
    //             break;
    //     }
    // }


    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    render() {
        return (
            <div>
                {!this.state.success ?
                    <div>
                        <table>
                            <tr>
                                <td>
                                    username:
                                </td>
                                <td>
                                    <input type="text"
                                           value={this.state.username}
                                           onChange={(event) => this.inputChange("username", event)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    email:
                                </td>
                                <td>
                                    <input type="text"
                                           value={this.state.email}
                                           onChange={(event) => this.inputChange("email", event)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    password:
                                </td>
                                <td>
                                    <input type={"password"}
                                           value={this.state.password}
                                           onChange={(event) => this.inputChange("password", event)}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button onClick={this.login}>Login</button>
                                </td>
                                <td>
                                    {this.state.connectionMessage}
                                </td>
                            </tr>
                        </table>
                    </div> :
                    <div>
                        <EditProfilePage username={this.state.username} passsword={this.state.password}
                                         email={this.state.email}/>
                    </div>
                }
            </div>
        )
    }
}

export default LoginPage;