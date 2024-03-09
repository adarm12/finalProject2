import axios, {formToJSON} from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "../ApiRequests";
import {BrowserRouter, Route, Routes, NavLink, Link} from "react-router-dom";
import LeagueTable from "../LeagueTable";
import GamblingPage from "../GamblingPage";
import LiveDashboard from "../LiveDashboard";

class LoginPage extends React.Component {
    state = {
        username: null,
        email: null,
        password: null,
        errorCode: null,

        newUsername: null,
        newPassword: null,
        editProfile: false,
        viewProfile: false,
        connectionMessage: "",
        editMessage: "",
        // text: "",
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
                this.setState({connectionMessage: "התחברת בהצלחה"});
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

    edit = () => {
        sendApiPostRequest("http://localhost:9124/edit-user", {
            email: this.state.email,
            newUsername: this.state.newUsername,
            password: this.state.password,
            newPassword: this.state.newPassword,
        }, (response) => {
            if (response.data.success) {
                console.log("הפרטים החדשים נשמרו בהצלחה");
                this.setState({editMessage: "הפרטים החדשים נשמרו בהצלחה"});
            } else {
                if (response.data.errorCode === 1)
                    this.setState({editMessage: "שם משתמש תפוס"});
                if (this.state.newPassword === "")
                    this.setState({editMessage: "אין סיסמה"});
                if (this.state.newUsername === "")
                    this.setState({editMessage: "אין שם משתמש"});
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
                {this.state.connectionMessage !== "התחברת בהצלחה" ?
                    <div>
                        username:
                        <input type="text"
                               value={this.state.username}
                               onChange={(event) => this.inputChange("username", event)}
                               placeholder="Enter user name"
                        />
                        email:
                        <input type="text"
                               value={this.state.email}
                               onChange={(event) => this.inputChange("email", event)}
                               placeholder="Enter email"/>
                        password:
                        <input type={"password"}
                               value={this.state.password}
                               onChange={(event) => this.inputChange("password", event)}
                               placeholder="Enter password"/>
                        <button onClick={this.login}>Login</button>
                        {this.state.connectionMessage}
                    </div>
                    :
                    <table>
                        {!this.state.editProfile ?
                            <tr>
                                <td>
                                    <button onClick={() => this.setState({editProfile: true})}>edit profile</button>
                                </td>
                                <td className="Pages">
                                    <LeagueTable></LeagueTable>
                                    <GamblingPage></GamblingPage>
                                    <GamblingPage></GamblingPage>
                                    <LiveDashboard></LiveDashboard>
                                </td>
                            </tr>
                            :
                            <div>
                                {this.state.editMessage !== "הפרטים החדשים נשמרו בהצלחה" ?
                                    <table>
                                        <tr>
                                            <td>
                                                email:
                                            </td>
                                            <td>
                                                {this.state.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                username:
                                            </td>
                                            <td>
                                                {this.state.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                new username:
                                            </td>
                                            <td>
                                                <input type={"text"}
                                                       value={this.state.newUsername}
                                                       onChange={(event) => this.inputChange("newUsername", event)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                password:
                                            </td>
                                            <td>
                                                {this.state.password}

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                new password:
                                            </td>
                                            <td>
                                                <input type={"password"}
                                                       value={this.state.newPassword}
                                                       onChange={(event) => this.inputChange("newPassword", event)}/>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <button onClick={this.edit}>submit</button>
                                            </td>
                                            <td>
                                                {this.state.editMessage}
                                            </td>
                                        </tr>
                                    </table>
                                    :
                                    <div>
                                    </div>
                                }
                            </div>
                        }
                    </table>
                }
            </div>
        )
    }
}

export default LoginPage;


