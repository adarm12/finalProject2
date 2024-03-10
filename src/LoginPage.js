import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";
import LeagueTable from "./LeagueTable";
import GamblingPage from "./GamblingPage";
import LiveDashboard from "./LiveDashboard";
import PersonalGamblingDashboard from "./PersonalGamblingDashboard";
import EditProfilePage from "./EditProfilePage";
import {FaRegUser} from "react-icons/fa";
import {MdEmail, MdPassword} from "react-icons/md";

class LoginPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        errorCode: null,
        editProfile: false,
        connectionMessage: "",
    }

    componentDidMount() {

    }

    login = () => {
        sendApiPostRequest("http://localhost:9123/login", {
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

    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    render() {
        return (
            <div className={"Login"}>
                <div>
                    {this.state.connectionMessage !== "התחברת בהצלחה" ?
                        <div>
                            <div>
                                <input type={"text"}
                                       value={this.state.username}
                                       onChange={(event) => this.inputChange("username", event)}
                                       placeholder="הזן שם משתמש"/>
                                <FaRegUser className="icon"/>
                            </div>
                            <div>
                                <input type={"text"}
                                       value={this.state.email}
                                       onChange={(event) => this.inputChange("email", event)}
                                       placeholder="הזן מייל"/>
                                <MdEmail className="icon"/>
                            </div>
                            <div>
                                <input type={"password"}
                                       value={this.state.password}
                                       onChange={(event) => this.inputChange("password", event)}
                                       placeholder="הזן סיסמא"/>
                                <MdPassword className="icon"/>
                            </div>
                            <button onClick={this.login}>Login</button>
                            {this.state.connectionMessage}
                        </div>
                        :
                        <div>
                            {!this.state.editProfile ?
                                <div>
                                    <button onClick={() => this.setState({editProfile: true})}>edit profile</button>
                                    <div className="Pages">
                                        <LeagueTable></LeagueTable>
                                        <GamblingPage></GamblingPage>
                                        <PersonalGamblingDashboard></PersonalGamblingDashboard>
                                        <LiveDashboard></LiveDashboard>
                                    </div>
                                </div>
                                :
                                <EditProfilePage stateFromLogin={this.state}/>
                            }
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default LoginPage;

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
