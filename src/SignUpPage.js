import React from "react";
import {MdEmail, MdNumbers, MdPassword} from "react-icons/md";
import {FaRegUser} from "react-icons/fa";
import {sendApiPostRequest} from "./ApiRequests";

class SignUpPage extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
        balance: 0,
        errorCode: null,
        text: ""
    }

    componentDidMount() {

    }

    signUp = () => {
        sendApiPostRequest("http://localhost:9123/sign-up", {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword,
            balance: this.state.balance,
        }, (response) => {
            if (response.data.success) {
                console.log("You have successfully signed up");
                this.setState({errorCode: 0});
            } else {
                this.setState({errorCode: response.data.errorCode},
                    ()=> { console.log("***********Error " + this.state.errorCode)});

            }
        })
    }

    showErrorCode = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 1:
                errorMessage = "user name not available";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 7:
                errorMessage = "No email entered";
                break;
            case 6:
                errorMessage = "Invalid mail";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 12:
                errorMessage = "Password is not the same";
                break;
            case 10:
                errorMessage = "Password length should be at least 8 characters";
                break;
            case 14:
                errorMessage = "The password must contain @ or !";
                break;
            case 13:
                errorMessage = "Email does not exist";
                break;
            case 15:
                errorMessage = "The balance should be bigger then 50";
                break;
            case 0:
                errorMessage =  "You have successfully signed up";
                break;
        }
        return errorMessage;
    }


    inputChange = (key, event) => {
        this.setState({
            [key]: event.target.value
        })
    }

    // isValidEmail = (email) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }
    //
    // samePassword = () => {
    //     return (this.state.password.equals(this.state.repeatPassword));
    // }
    //

    render() {
        return (
            <div className={"DSignUp"}>
                <label> Sign Up </label>
                <div>
                    <input type="text"
                           value={this.state.username}
                           onChange={(event) => this.inputChange("username", event)}
                           placeholder="Enter username"
                    />
                    <FaRegUser className="icon"/>
                </div>
                <div>
                    <input type="text"
                           value={this.state.email}
                           onChange={(event) => this.inputChange("email", event)}
                           placeholder="Enter email"
                    />
                    <MdEmail className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.password}
                           onChange={(event) => this.inputChange("password", event)}
                           placeholder="Enter password"
                    />
                    <MdPassword className="icon"/>
                </div>
                <div>
                    <input type={"password"}
                           value={this.state.repeatPassword}
                           onChange={(event) => this.inputChange("repeatPassword", event)}
                           placeholder="Repeat password"
                    />
                    <MdPassword className="icon"/>
                </div>
                <div>
                    <input type={"number"}
                           value={this.state.balance}
                           onChange={(event) => this.inputChange("balance", event)}
                           placeholder="Enter balance"
                    />
                    <MdNumbers className={"icon"}/>
                </div>
                <button onClick={this.signUp} >Sign Up</button>

                {this.showErrorCode()}
            </div>
        )
    }
}

export default SignUpPage;