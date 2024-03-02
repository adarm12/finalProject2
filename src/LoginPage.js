import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";

class LoginPage extends React.Component {
    state = {
        email: "",
        password: "",
        errorCode: null,
        text: "",
    }

    componentDidMount() {

    }

    login = () => {
        sendApiPostRequest("http://localhost:9124/login", {
            email: this.state.email,
            password: this.state.password,
        }, (response) => {
            if (response.data.success) {
                console.log("התחברת בהצלחה");
                this.setState({text: "התחברת בהצלחה"});
            } else {
                console.log("לא התחברת בהצלחה");
                this.setState({text: "לא התחברת בהצלחה"});
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
                            <button onClick={this.login}>Login</button>
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

export default LoginPage;