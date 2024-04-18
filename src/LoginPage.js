import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import PersonalGamblingPage from "./PersonalGamblingPage";
import LiveDashboard from "./LiveDashboard";
import EditProfilePage from "./EditProfilePage";
import {MdEmail, MdPassword} from "react-icons/md";
import LeagueTable from "./LeagueTable";


class LoginPage extends React.Component {
    state = {
        title: "Login",
        username: "",
        email: "",
        password: "",
        balance: "",
        errorCode: null,
        editProfile: false,
        loginSuccess: false,
        connectionMessage: "",
        live: false,
        leagueTable: false,
        showButtons: true,
    }

    componentDidMount() {

    }

    login = () => {
        sendApiPostRequest("http://localhost:9123/login", {
            // username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }, (response) => {
            if (response.data.success) {
                console.log("Successfully connected");
                this.setState({connectionMessage: "Successfully connected"});
                this.setState({loginSuccess: true});
                this.setState({username: response.data.user.username});
                this.setState({balance: response.data.user.balance});
                const cookies = new Cookies(null, {path: '/'});
                cookies.set('id', response.data.id);
                cookies.set('secret', response.data.secret);
            } else {
                if (response.data.errorCode === 11)
                    this.setState({connectionMessage: "Invalid password"});
                if (response.data.errorCode === 4)
                    this.setState({connectionMessage: "No password entered"});
                if (response.data.errorCode === 2)
                    this.setState({connectionMessage: "User name does not exist"});
                if (response.data.errorCode === 3)
                    this.setState({connectionMessage: "No username entered"});
                if (response.data.errorCode === 13)
                    this.setState({connectionMessage: "Email does not exist"});
                if (response.data.errorCode === 7)
                    this.setState({connectionMessage: "No email entered"});
            }
        })
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
                    {this.state.connectionMessage !== "Successfully connected" ?
                        <div className={"DSignUp"}>
                            <label> {this.state.title} </label>
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
                            {this.state.connectionMessage}
                        </div>
                        :
                        <div>
                            {this.state.showButtons ?
                                <div className={"DSignUp"}>
                                    <div>
                                        <button onClick={() => this.setState({
                                            editProfile: true,
                                            showButtons: false,
                                            title: ""
                                        })}>Edit
                                            Profile
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => this.setState({
                                            live: true,
                                            showButtons: false,
                                            title: ""
                                        })}>Live
                                            Dashboard
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => this.setState({
                                            leagueTable: true,
                                            showButtons: false,
                                            title: ""
                                        })}>League Table
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={() => this.setState({
                                            personalGambling: true,
                                            showButtons: false,
                                            title: ""
                                        })}>Personal
                                            Gambling
                                        </button>
                                    </div>
                                </div>
                                :
                                <div>
                                    {this.state.editProfile ?
                                        <EditProfilePage stateFromLogin={this.state}/>
                                        :
                                        <div></div>
                                    }
                                    {this.state.live ?
                                        <LiveDashboard stateFromLogin={this.state}/>
                                        :
                                        <div></div>
                                    }
                                    {this.state.leagueTable ?
                                        <LeagueTable></LeagueTable>
                                        :
                                        <div></div>
                                    }
                                    {this.state.personalGambling ?
                                        <PersonalGamblingPage></PersonalGamblingPage>
                                        :
                                        <div></div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default LoginPage;