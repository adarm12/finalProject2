import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import {sendApiPostRequest} from "./ApiRequests";

class SignUpPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        text: ""
    }

    componentDidMount() {

    }

    signUp = () => {
        sendApiPostRequest("http://localhost:9124/add-user", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }, (response) => {
            if (response.data.success) {
                console.log("נרשמת בהצלחה");
                this.setState({text: "נרשמת בהצלחה"});
            } else {
                if (response.data.errorCode === 2)
                    this.setState({text: "אין שם משתמש"});
                if (response.data.errorCode === 7)
                    this.setState({text: "אין מייל"});
                if (response.data.errorCode === 6)
                    this.setState({text: "מייל לא תקין"});
                if (response.data.errorCode === 11)
                    this.setState({text: "אין סיסמה"});
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
                            Password:
                        </td>
                        <td>
                            <input type={"password"}
                                   value={this.state.password}
                                   onChange={(event) => this.inputChange("password", event)}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={this.signUp}>Sign Up</button>
                        </td>
                        <td>
                            {this.state.text}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default SignUpPage;