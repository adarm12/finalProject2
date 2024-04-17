import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import PersonalGamblingPage from "./PersonalGamblingPage";
import LiveDashboard from "./LiveDashboard";
import EditProfilePage from "./EditProfilePage";
import {MdEmail, MdPassword} from "react-icons/md";
import LeagueTable from "./LeagueTable";
import SuccessConnection from "./SuccessConnection";


class LoginPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        errorCode: null,
        connectionSuccess: false,
        balance: "",
    }

    componentDidMount() {
    }

    login = () => {
        sendApiPostRequest("http://localhost:9123/login", {
            email: this.state.email,
            password: this.state.password,
        }, (response) => {
            if (response.data.success) {
                console.log("Successfully connected");
                this.setState({
                    connectionSuccess: true,
                    username: response.data.user.username,
                    balance: response.data.user.balance
                });
                const cookies = new Cookies(null, {path: '/'});
                cookies.set('id', response.data.id);
                cookies.set('secret', response.data.secret);
            } else
                this.setState({errorCode: response.data.errorCode})
        })
    }

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 11:
                errorMessage = "Invalid password";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 2:
                errorMessage = "User name does not exist";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 13:
                errorMessage = "Email does not exist";
                break;
            case 7:
                errorMessage = "No email entered";
                break;
        }
        return errorMessage;
    }


    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <div>
                    {!this.state.connectionSuccess ?
                        <div className={"DSignUp"}>
                            <label> Login </label>
                            <div>
                                <input type={"text"}
                                       value={this.state.email}
                                       onChange={(event) => this.inputChange("email", event)}
                                       placeholder="Enter email"/>
                                <MdEmail className="icon"/>
                            </div>
                            <div>
                                <input type={"password"}
                                       value={this.state.password}
                                       onChange={(event) => this.inputChange("password", event)}
                                       placeholder="Enter password"/>
                                <MdPassword className="icon"/>
                            </div>
                            <button onClick={this.login}>Login</button>
                            <div>{this.showErrorCode()}</div>
                        </div>
                        :
                        <div>
                            <SuccessConnection stateFromLogin={this.state}/>
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default LoginPage;