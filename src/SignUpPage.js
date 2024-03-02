import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';

class SignUpPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        text:""
    }

    componentDidMount() {

    }

    signUp = () => {
        axios.post("http://localhost:9124/add-user", {
            params: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        }).then(response => {
            if (response.data.success) {
                console.log("נרשמת בהצלחה");
                this.setState({ text: "נרשמת בהצלחה" });
            } else {
                console.log("לא נרשמת בהצלחה");
                this.setState({ text: response.data.errorCode });
                this.setState({ text: "לא נרשמת בהצלחה" });
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
                            {this.state.username}
                            {this.state.email}
                            {this.state.password}
                        </td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default SignUpPage;